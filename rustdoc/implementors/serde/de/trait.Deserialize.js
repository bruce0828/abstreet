(function() {var implementors = {};
implementors["abstutil"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Manifest","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Entry","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for DataPacks","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for MapName","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Tags","synthetic":false,"types":[]},{"text":"impl&lt;'de, K:&nbsp;IndexableKey, V&gt; Deserialize&lt;'de&gt; for FixedMap&lt;K, V&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;V: Deserialize&lt;'de&gt;,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["collisions"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for CollisionDataset","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Collision","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Severity","synthetic":false,"types":[]}];
implementors["convert_osm"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for OnstreetParking","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PublicOffstreetParking","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PrivateOffstreetParking","synthetic":false,"types":[]}];
implementors["experiment"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Level","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Session","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ColorScheme","synthetic":false,"types":[]}];
implementors["game"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RecordedStoryMap","synthetic":false,"types":[]}];
implementors["geom"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Angle","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Bounds","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for GPSBounds","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Circle","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Distance","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Duration","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for LonLat","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Line","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for InfiniteLine","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Polygon","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PolyLine","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Pt2D","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Ring","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Speed","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Statistic","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Time","synthetic":false,"types":[]}];
implementors["headless"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for LoadSim","synthetic":false,"types":[]}];
implementors["import_traffic"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Input","synthetic":false,"types":[]}];
implementors["importer"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Record","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ImporterConfiguration <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;ImporterConfiguration: Default,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for GenericCityImporter","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripRecord","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for StopTimeRecord","synthetic":false,"types":[]}];
implementors["kml"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ExtraShapes","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ExtraShape","synthetic":false,"types":[]}];
implementors["map_model"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for City","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for OriginalLane","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ChangeLaneType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ReverseLane","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ChangeSpeedLimit","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ChangeAccessRestrictions","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PermanentMapEdits","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PermanentEditIntersection","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PermanentEditCmd","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for EditRoad","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for MapConfig","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for DrivingSide","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for AreaID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for AreaType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Area","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for BuildingID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Building","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Amenity","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for OffstreetParking","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for BuildingType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for NamePerLanguage","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for BusStopID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for BusRouteID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for BusStop","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for BusRoute","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for IntersectionID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for IntersectionType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Intersection","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for LaneID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for LaneType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Lane","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ParkingLotID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ParkingLot","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RoadID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Direction","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for DirectedRoadID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Road","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ControlStopSign","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RoadWithStopSign","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ControlTrafficSignal","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Stage","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PhaseType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TurnID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TurnType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TurnPriority","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Turn","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for MovementID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for CompressedMovementID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Movement","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for AccessRestrictions","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Zone","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for NodeID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for WayID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RelationID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for OsmID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ContractionHierarchyPathfinder","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for VehiclePathfinder","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Node","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Pathfinder","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for IntersectionCluster","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for UberTurn","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for SidewalkPathfinder","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for WalkingNode","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PathStep","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Path","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PathConstraints","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PathRequest","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RawMap","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for OriginalRoad","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RawRoad","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RawIntersection","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RawBuilding","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RawArea","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RawParkingLot","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RestrictionType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RawBusRoute","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for RawBusStop","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Position","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Traversable","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Map","synthetic":false,"types":[]}];
implementors["sim"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Analytics","synthetic":false,"types":[]},{"text":"impl&lt;'de, X:&nbsp;Ord + Clone&gt; Deserialize&lt;'de&gt; for TimeSeriesCount&lt;X&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;X: Deserialize&lt;'de&gt;,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for CapSimState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Zone","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Event","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for AlertLocation","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripPhaseType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ExternalPerson","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ExternalTrip","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ExternalTripEndpoint","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ScenarioGenerator","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for SpawnOverTime","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for BorderSpawnOverTime","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ScenarioModifier","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Scenario","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PersonSpec","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for IndividTrip","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripPurpose","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripSpec","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripEndpoint","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Car","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for CarState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for DrivingSimState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for IntersectionSimState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for State","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for SignalState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Request","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ParkingSimState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for NormalParkingSimState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ParkingLane","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for InfiniteParkingSimState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Queue","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for WalkingSimState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Pedestrian","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PedState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Cmd","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Router","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Goal","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Command","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for CommandType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Item","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Scheduler","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Sim","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Stop","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Route","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Bus","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for BusState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TransitSimState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripManager","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Trip","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripInfo","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripLeg","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripMode","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Person","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PersonState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for CarID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PedestrianID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for AgentID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for AgentType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TripID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for PersonID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for OrigPersonID","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for VehicleType","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Vehicle","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for VehicleSpec","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ParkingSpot","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ParkedCar","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for DrivingGoal","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for SidewalkSpot","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for SidewalkPOI","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for TimeInterval","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for DistanceInterval","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for CreatePedestrian","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for CreateCar","synthetic":false,"types":[]}];
implementors["widgetry"] = [{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for CameraState","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for Color","synthetic":false,"types":[]},{"text":"impl&lt;'de&gt; Deserialize&lt;'de&gt; for ScreenDims","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()