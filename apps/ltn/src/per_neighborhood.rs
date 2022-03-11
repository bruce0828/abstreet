use geom::Distance;
use map_model::{IntersectionID, PathConstraints, RoadID};
use widgetry::mapspace::{ObjectID, World, WorldOutcome};
use widgetry::tools::open_browser;
use widgetry::{
    lctrl, EventCtx, Image, Key, Line, Panel, PanelBuilder, Text, TextExt, Widget,
    DEFAULT_CORNER_RADIUS,
};

use crate::{
    after_edit, colors, App, BrowseNeighborhoods, DiagonalFilter, Neighborhood, NeighborhoodID,
    Transition,
};

#[derive(PartialEq)]
pub enum Tab {
    Connectivity,
    RatRuns,
}

impl Tab {
    pub fn panel_builder(
        self,
        ctx: &mut EventCtx,
        app: &App,
        top_panel: &Panel,
        per_tab_contents: Widget,
    ) -> PanelBuilder {
        let contents = Widget::col(vec![
            app.session.alt_proposals.to_widget(ctx, app),
            ctx.style()
                .btn_back("Browse neighborhoods")
                .hotkey(Key::Escape)
                .build_def(ctx),
            Line("Editing neighborhood")
                .small_heading()
                .into_widget(ctx),
            Widget::col(vec![
                Widget::row(vec![
                    Image::from_path("system/assets/tools/pencil.svg")
                        .into_widget(ctx)
                        .centered_vert(),
                    Text::from(Line(
                        "Click a road or intersection to add or remove a modal filter",
                    ))
                    .wrap_to_pct(ctx, 15)
                    .into_widget(ctx),
                ]),
                Widget::row(vec![
                    format!(
                        "{} filters added",
                        app.session.modal_filters.roads.len()
                            + app.session.modal_filters.intersections.len()
                    )
                    .text_widget(ctx)
                    .centered_vert(),
                    ctx.style()
                        .btn_plain
                        .icon("system/assets/tools/undo.svg")
                        .disabled(app.session.modal_filters.previous_version.is_none())
                        .hotkey(lctrl(Key::Z))
                        .build_widget(ctx, "undo"),
                ]),
            ])
            .section(ctx),
            self.make_buttons(ctx),
            per_tab_contents.section(ctx),
        ]);
        crate::common::left_panel_builder(ctx, top_panel, contents)
    }

    pub fn handle_action(
        self,
        ctx: &mut EventCtx,
        app: &mut App,
        action: &str,
        id: NeighborhoodID,
    ) -> Option<Transition> {
        Some(match action {
            "Browse neighborhoods" => {
                // Recalculate the state to redraw any changed filters
                Transition::Replace(BrowseNeighborhoods::new_state(ctx, app))
            }
            "Adjust boundary" => Transition::Replace(
                crate::select_boundary::SelectBoundary::new_state(ctx, app, id),
            ),
            "Connectivity" => Tab::Connectivity.switch_to_state(ctx, app, id),
            "Rat runs" => Tab::RatRuns.switch_to_state(ctx, app, id),
            "undo" => {
                let prev = app.session.modal_filters.previous_version.take().unwrap();
                app.session.modal_filters = prev;
                after_edit(ctx, app);
                // Recreate the current state. This will reset any panel state (checkboxes and
                // dropdowns)
                self.switch_to_state(ctx, app, id)
            }
            x => {
                return crate::save::AltProposals::handle_action(
                    ctx,
                    app,
                    crate::save::PreserveState::per_neighborhood(app, self, id),
                    x,
                );
            }
        })
    }

    pub fn switch_to_state(
        self,
        ctx: &mut EventCtx,
        app: &mut App,
        id: NeighborhoodID,
    ) -> Transition {
        Transition::Replace(match self {
            Tab::Connectivity => crate::connectivity::Viewer::new_state(ctx, app, id),
            Tab::RatRuns => crate::rat_run_viewer::BrowseRatRuns::new_state(ctx, app, id, None),
        })
    }

    fn make_buttons(self, ctx: &mut EventCtx) -> Widget {
        let mut row = Vec::new();
        for (tab, label, key) in [
            (Tab::Connectivity, "Connectivity", Key::F1),
            (Tab::RatRuns, "Rat runs", Key::F2),
        ] {
            // TODO Match the TabController styling
            row.push(
                ctx.style()
                    .btn_tab
                    .text(label)
                    .corner_rounding(geom::CornerRadii {
                        top_left: DEFAULT_CORNER_RADIUS,
                        top_right: DEFAULT_CORNER_RADIUS,
                        bottom_left: 0.0,
                        bottom_right: 0.0,
                    })
                    .hotkey(key)
                    // We abuse "disabled" to denote "currently selected"
                    .disabled(self == tab)
                    .build_def(ctx),
            );
        }
        // TODO The 3rd doesn't really act like a tab
        row.push(
            ctx.style()
                .btn_tab
                .text("Adjust boundary")
                .corner_rounding(geom::CornerRadii {
                    top_left: DEFAULT_CORNER_RADIUS,
                    top_right: DEFAULT_CORNER_RADIUS,
                    bottom_left: 0.0,
                    bottom_right: 0.0,
                })
                .hotkey(Key::B)
                .build_def(ctx),
        );

        Widget::row(row)
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum FilterableObj {
    InteriorRoad(RoadID),
    InteriorIntersection(IntersectionID),
}
impl ObjectID for FilterableObj {}

/// Adds clickable objects for managing filters on roads and intersections. The caller is
/// responsible for base drawing behavior, initialize_hover, etc.
pub fn populate_world<T: ObjectID, F: Fn(FilterableObj) -> T>(
    ctx: &mut EventCtx,
    app: &App,
    neighborhood: &Neighborhood,
    world: &mut World<T>,
    wrap_id: F,
    zorder: usize,
) {
    let map = &app.map;

    for r in &neighborhood.orig_perimeter.interior {
        world
            .add(wrap_id(FilterableObj::InteriorRoad(*r)))
            .hitbox(map.get_r(*r).get_thick_polygon())
            .zorder(zorder)
            .drawn_in_master_batch()
            .hover_outline(colors::OUTLINE, Distance::meters(5.0))
            .hotkey(lctrl(Key::D), "debug")
            .clickable()
            .build(ctx);
    }

    for i in &neighborhood.interior_intersections {
        world
            .add(wrap_id(FilterableObj::InteriorIntersection(*i)))
            .hitbox(map.get_i(*i).polygon.clone())
            .zorder(zorder)
            .drawn_in_master_batch()
            .hover_outline(colors::OUTLINE, Distance::meters(5.0))
            .clickable()
            .hotkey(lctrl(Key::D), "debug")
            .build(ctx);
    }
}

/// If true, the neighborhood has changed and the caller should recalculate stuff, including the
/// panel
pub fn handle_world_outcome(
    ctx: &mut EventCtx,
    app: &mut App,
    outcome: WorldOutcome<FilterableObj>,
) -> bool {
    let map = &app.map;
    match outcome {
        WorldOutcome::ClickedObject(FilterableObj::InteriorRoad(r)) => {
            let road = map.get_r(r);
            // Filtering on a road that's already marked bike-only doesn't make sense
            if !PathConstraints::Car.can_use_road(road, map) {
                return true;
            }

            app.session.modal_filters.before_edit();
            if app.session.modal_filters.roads.remove(&r).is_none() {
                // Place the filter on the part of the road that was clicked
                // These calls shouldn't fail -- since we clicked a road, the cursor must be in
                // map-space. And project_pt returns a point that's guaranteed to be on the
                // polyline.
                let cursor_pt = ctx.canvas.get_cursor_in_map_space().unwrap();
                let pt_on_line = road.center_pts.project_pt(cursor_pt);
                let (distance, _) = road.center_pts.dist_along_of_point(pt_on_line).unwrap();

                app.session.modal_filters.roads.insert(r, distance);
            }
            after_edit(ctx, app);
            true
        }
        WorldOutcome::ClickedObject(FilterableObj::InteriorIntersection(i)) => {
            DiagonalFilter::cycle_through_alternatives(ctx, app, i);
            true
        }
        WorldOutcome::Keypress("debug", FilterableObj::InteriorIntersection(i)) => {
            open_browser(app.map.get_i(i).orig_id.to_string());
            false
        }
        WorldOutcome::Keypress("debug", FilterableObj::InteriorRoad(r)) => {
            open_browser(app.map.get_r(r).orig_id.osm_way_id.to_string());
            false
        }
        _ => false,
    }
}
