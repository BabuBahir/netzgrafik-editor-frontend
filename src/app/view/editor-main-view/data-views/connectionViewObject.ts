import {Connection} from "../../../models/connection.model";
import {Node} from "../../../models/node.model";
import {SimpleTrainrunSectionRouter} from "../../../services/util/trainrunsection.routing";
import {Vec2D} from "../../../utils/vec2D";
import {EditorView} from "./editor.view";

export class ConnectionsViewObject {
  key: string;
  readonly path: Vec2D[];

  constructor(
    private editorView: EditorView,
    public connection: Connection,
    public node: Node,
    displayConnectionPin1: boolean,
    displayConnectionPin2: boolean,
  ) {
    this.path = ConnectionsViewObject.computePath(connection, node);
    this.key = ConnectionsViewObject.generateKey(
      editorView,
      connection,
      displayConnectionPin1,
      displayConnectionPin2,
      this.path,
    );
  }

  static computePath(connection: Connection, node: Node): Vec2D[] {
    return SimpleTrainrunSectionRouter.routeConnection(
      node,
      node.getPort(connection.getPortId1()),
      node.getPort(connection.getPortId2()),
    );
  }

  static generateKey(
    editorView: EditorView,
    connection: Connection,
    displayConnectionPin1: boolean,
    displayConnectionPin2: boolean,
    path: Vec2D[],
  ): string {
    let key =
      "#" +
      connection.getId() +
      "@" +
      connection.hasWarning() +
      "_" +
      connection.getPortId1() +
      "_" +
      connection.getPortId2() +
      "_" +
      connection.selected() +
      "_" +
      path[0] +
      "_" +
      path[1] +
      "_" +
      path[2] +
      "_" +
      path[3] +
      "_" +
      displayConnectionPin1 +
      "_" +
      displayConnectionPin2 +
      "_" +
      editorView.isTemporaryDisableFilteringOfItemsInViewEnabled() +
      "_" +
      editorView.getLevelOfDetail() +
      "_" +
      editorView.trainrunSectionPreviewLineView.getVariantIsWritable();

    path.forEach((p) => {
      key += p.toString();
    });
    return key;
  }
}
