use std::collections::HashSet;

use abstutil::{prettyprint_usize, Counter, Timer};
use geom::{Distance, Duration};
use map_gui::load::FileLoader;
use map_gui::tools::ColorNetwork;
use map_gui::ID;
use map_model::{PathRequest, PathStepV2, RoadID};
use sim::{Scenario, TripEndpoint, TripMode};
use widgetry::{
    Drawable, EventCtx, GfxCtx, HorizontalAlignment, Line, Outcome, Panel, Spinner, State, Text,
    TextExt, VerticalAlignment, Widget,
};

use crate::app::{App, Transition};
use crate::ungap::{Layers, Tab, TakeLayers};

pub struct ShowGaps {
    top_panel: Panel,
    layers: Layers,
    tooltip: Option<Text>,
}

impl TakeLayers for ShowGaps {
    fn take_layers(self) -> Layers {
        self.layers
    }
}

impl ShowGaps {
    pub fn new_state(ctx: &mut EventCtx, app: &mut App, layers: Layers) -> Box<dyn State<App>> {
        let map_name = app.primary.map.get_name().clone();
        if app.session.mode_shift.key().as_ref() == Some(&map_name) {
            return Box::new(ShowGaps {
                top_panel: make_top_panel(ctx, app),
                layers,
                tooltip: None,
            });
        }

        let scenario_name = crate::pregame::default_scenario_for_map(&map_name);
        if scenario_name == "home_to_work" {
            // TODO Should we generate and use this scenario? Or maybe just disable this mode
            // entirely?
            app.session.mode_shift.set(
                map_name,
                ModeShiftData {
                    all_candidate_trips: Vec::new(),
                    filters: Filters::default(),
                    gaps: NetworkGaps {
                        draw_unzoomed: Drawable::empty(ctx),
                        draw_zoomed: Drawable::empty(ctx),
                        count_per_road: Counter::new(),
                    },
                    num_filtered_trips: 0,
                },
            );
            ShowGaps::new_state(ctx, app, layers)
        } else {
            FileLoader::<App, Scenario>::new_state(
                ctx,
                abstio::path_scenario(&map_name, &scenario_name),
                Box::new(|ctx, app, _, maybe_scenario| {
                    // TODO Handle corrupt files
                    let scenario = maybe_scenario.unwrap();
                    let data = ctx.loading_screen("predict mode shift", |ctx, timer| {
                        ModeShiftData::from_scenario(ctx, app, scenario, timer)
                    });
                    app.session.mode_shift.set(map_name, data);
                    Transition::Replace(ShowGaps::new_state(ctx, app, layers))
                }),
            )
        }
    }
}

impl State<App> for ShowGaps {
    fn event(&mut self, ctx: &mut EventCtx, app: &mut App) -> Transition {
        ctx.canvas_movement();
        if ctx.redo_mouseover() {
            self.tooltip = None;
            if let Some(r) = match app.mouseover_unzoomed_roads_and_intersections(ctx) {
                Some(ID::Road(r)) => Some(r),
                Some(ID::Lane(l)) => Some(l.road),
                _ => None,
            } {
                let data = app.session.mode_shift.value().unwrap();
                let count = data.gaps.count_per_road.get(r);
                if count > 0 {
                    // TODO Word more precisely... or less verbosely.
                    self.tooltip = Some(Text::from(Line(format!(
                        "{} trips might cross this high-stress road",
                        prettyprint_usize(count)
                    ))));
                }
            }
        }

        match self.top_panel.event(ctx) {
            Outcome::Clicked(x) => {
                return Tab::PredictImpact
                    .handle_action::<ShowGaps>(ctx, app, &x)
                    .unwrap();
            }
            Outcome::Changed(_) => {
                let (map_name, mut data) = app.session.mode_shift.take().unwrap();
                data.filters = Filters::from_controls(&self.top_panel);
                ctx.loading_screen("update mode shift", |ctx, timer| {
                    data.recalculate_gaps(ctx, app, timer)
                });
                app.session.mode_shift.set(map_name, data);
                // TODO This is heavy-handed for just updating the counter
                self.top_panel = make_top_panel(ctx, app);
            }
            _ => {}
        }

        if let Some(t) = self.layers.event(ctx, app) {
            return t;
        }

        Transition::Keep
    }

    fn draw(&self, g: &mut GfxCtx, app: &App) {
        self.top_panel.draw(g);
        self.layers.draw(g, app);

        let data = app.session.mode_shift.value().unwrap();
        if g.canvas.cam_zoom < app.opts.min_zoom_for_detail {
            g.redraw(&data.gaps.draw_unzoomed);
        } else {
            g.redraw(&data.gaps.draw_zoomed);
        }
        if let Some(ref txt) = self.tooltip {
            g.draw_mouse_tooltip(txt.clone());
        }
    }
}

fn make_top_panel(ctx: &mut EventCtx, app: &App) -> Panel {
    let data = app.session.mode_shift.value().unwrap();
    let col = vec![
        Tab::PredictImpact.make_header(ctx, app),
        // TODO Info button with popup explaining all the assumptions... (where scenario data comes
        // from, only driving -> cycling, no off-map starts or ends, etc)
        format!(
            "{} candidate trips before filtering",
            prettyprint_usize(data.all_candidate_trips.len())
        )
        .text_widget(ctx),
        data.filters.to_controls(ctx),
        format!(
            "{} trips after filtering",
            prettyprint_usize(data.num_filtered_trips)
        )
        .text_widget(ctx),
    ];

    Panel::new_builder(Widget::col(col))
        .aligned(HorizontalAlignment::Left, VerticalAlignment::Top)
        .build(ctx)
}

// TODO For now, it's easier to just copy pieces from sandbox/dashboards/mode_shift.rs. I'm not
// sure how these two tools will interact yet, so not worth trying to refactor anything. One works
// off Scenario files directly, the other off an instantiated Scenario.

pub struct ModeShiftData {
    // Calculated from the unedited map, not yet filtered.
    all_candidate_trips: Vec<CandidateTrip>,
    filters: Filters,
    // From the unedited map, filtered
    gaps: NetworkGaps,
    num_filtered_trips: usize,
    // TODO Then a score, comparing those gaps with the current map edits.
}

struct CandidateTrip {
    bike_req: PathRequest,
    estimated_driving_time: Duration,
    estimated_biking_time: Duration,
    biking_distance: Distance,
    total_elevation_gain: Distance,
}

struct Filters {
    max_driving_time: Duration,
    max_biking_time: Duration,
    max_biking_distance: Distance,
    max_elevation_gain: Distance,
}

struct NetworkGaps {
    draw_unzoomed: Drawable,
    draw_zoomed: Drawable,
    count_per_road: Counter<RoadID>,
}

impl Filters {
    fn default() -> Filters {
        Filters {
            max_driving_time: Duration::minutes(30),
            max_biking_time: Duration::minutes(30),
            max_biking_distance: Distance::miles(10.0),
            max_elevation_gain: Distance::feet(30.0),
        }
    }

    fn apply(&self, x: &CandidateTrip) -> bool {
        x.estimated_driving_time <= self.max_driving_time
            && x.estimated_biking_time <= self.max_biking_time
            && x.biking_distance <= self.max_biking_distance
            && x.total_elevation_gain <= self.max_elevation_gain
    }

    fn to_controls(&self, ctx: &mut EventCtx) -> Widget {
        Widget::col(vec![
            Widget::custom_row(vec![
                Widget::row(vec![
                    "Max driving time".text_widget(ctx).centered_vert(),
                    Spinner::widget(
                        ctx,
                        "max_driving_time",
                        (Duration::ZERO, Duration::hours(12)),
                        self.max_driving_time,
                        Duration::minutes(1),
                    ),
                ]),
                Widget::row(vec![
                    "Max biking time".text_widget(ctx).centered_vert(),
                    Spinner::widget(
                        ctx,
                        "max_biking_time",
                        (Duration::ZERO, Duration::hours(12)),
                        self.max_biking_time,
                        Duration::minutes(1),
                    ),
                ]),
            ])
            .evenly_spaced(),
            Widget::custom_row(vec![
                Widget::row(vec![
                    "Max biking distance".text_widget(ctx).centered_vert(),
                    Spinner::widget(
                        ctx,
                        "max_biking_distance",
                        (Distance::ZERO, Distance::miles(20.0)),
                        self.max_biking_distance,
                        Distance::miles(0.1),
                    ),
                ]),
                Widget::row(vec![
                    "Max elevation gain".text_widget(ctx).centered_vert(),
                    Spinner::widget(
                        ctx,
                        "max_elevation_gain",
                        (Distance::ZERO, Distance::feet(500.0)),
                        self.max_elevation_gain,
                        Distance::feet(10.0),
                    ),
                ]),
            ])
            .evenly_spaced(),
        ])
    }

    fn from_controls(panel: &Panel) -> Filters {
        Filters {
            max_driving_time: panel.spinner("max_driving_time"),
            max_biking_time: panel.spinner("max_biking_time"),
            max_biking_distance: panel.spinner("max_biking_distance"),
            max_elevation_gain: panel.spinner("max_elevation_gain"),
        }
    }
}

impl ModeShiftData {
    fn from_scenario(
        ctx: &mut EventCtx,
        app: &App,
        scenario: Scenario,
        timer: &mut Timer,
    ) -> ModeShiftData {
        let map = app
            .primary
            .unedited_map
            .as_ref()
            .unwrap_or(&app.primary.map);
        let all_candidate_trips = timer
            .parallelize(
                "analyze trips",
                scenario
                    .all_trips()
                    .filter(|trip| {
                        trip.mode == TripMode::Drive
                            && matches!(trip.origin, TripEndpoint::Bldg(_))
                            && matches!(trip.destination, TripEndpoint::Bldg(_))
                    })
                    .collect(),
                |trip| {
                    // TODO Does ? work
                    if let (Some(driving_path), Some(biking_path)) = (
                        TripEndpoint::path_req(trip.origin, trip.destination, TripMode::Drive, map)
                            .and_then(|req| map.pathfind(req).ok()),
                        TripEndpoint::path_req(trip.origin, trip.destination, TripMode::Bike, map)
                            .and_then(|req| map.pathfind(req).ok()),
                    ) {
                        let (total_elevation_gain, _) = biking_path.get_total_elevation_change(map);
                        Some(CandidateTrip {
                            bike_req: biking_path.get_req().clone(),
                            estimated_driving_time: driving_path.estimate_duration(map, None),
                            estimated_biking_time: biking_path
                                .estimate_duration(map, Some(map_model::MAX_BIKE_SPEED)),
                            biking_distance: biking_path.total_length(),
                            total_elevation_gain,
                        })
                    } else {
                        None
                    }
                },
            )
            .into_iter()
            .flatten()
            .collect();
        let mut data = ModeShiftData {
            filters: Filters::default(),
            all_candidate_trips,
            gaps: NetworkGaps {
                draw_unzoomed: Drawable::empty(ctx),
                draw_zoomed: Drawable::empty(ctx),
                count_per_road: Counter::new(),
            },
            num_filtered_trips: 0,
        };
        data.recalculate_gaps(ctx, app, timer);
        data
    }

    fn recalculate_gaps(&mut self, ctx: &mut EventCtx, app: &App, timer: &mut Timer) {
        let map = app
            .primary
            .unedited_map
            .as_ref()
            .unwrap_or(&app.primary.map);

        // Find all high-stress roads, since we'll filter by them next
        let high_stress: HashSet<RoadID> = map
            .all_roads()
            .iter()
            .filter_map(|r| {
                if r.high_stress_for_bikes(map) {
                    Some(r.id)
                } else {
                    None
                }
            })
            .collect();

        let filtered_requests: Vec<PathRequest> = self
            .all_candidate_trips
            .iter()
            .filter_map(|trip| {
                if self.filters.apply(trip) {
                    Some(trip.bike_req.clone())
                } else {
                    None
                }
            })
            .collect();
        self.num_filtered_trips = filtered_requests.len();

        let mut count_per_road = Counter::new();
        for path in timer
            .parallelize("calculate routes", filtered_requests, |req| {
                map.pathfind_v2(req)
            })
            .into_iter()
            .flatten()
        {
            for step in path.get_steps() {
                // No Contraflow steps for bike paths
                if let PathStepV2::Along(dr) = step {
                    if high_stress.contains(&dr.id) {
                        count_per_road.inc(dr.id);
                    }
                }
            }
        }

        let mut colorer = ColorNetwork::new(app);
        colorer.ranked_roads(count_per_road.clone(), &app.cs.good_to_bad_red);
        // The Colorer fades the map as the very first thing in the batch, but we don't want to do
        // that twice.
        colorer.unzoomed.shift();
        let (draw_unzoomed, draw_zoomed) = colorer.build(ctx);
        self.gaps = NetworkGaps {
            draw_unzoomed,
            draw_zoomed,
            count_per_road,
        };
    }
}
