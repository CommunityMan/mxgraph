/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
import {MxEvent} from "./MxEvent";
import {MxUtils} from "./MxUtils";
import {MxClient} from "../MxClient";

/**
 * Class: mxMouseEvent
 * 
 * Base class for all mouse events in mxGraph. A listener for this event should
 * implement the following methods:
 * 
 * (code)
 * graph.addMouseListener(
 * {
 *   mouseDown: function(sender, evt)
 *   {
 *     mxLog.debug('mouseDown');
 *   },
 *   mouseMove: function(sender, evt)
 *   {
 *     mxLog.debug('mouseMove');
 *   },
 *   mouseUp: function(sender, evt)
 *   {
 *     mxLog.debug('mouseUp');
 *   }
 * });
 * (end)
 * 
 * Constructor: mxMouseEvent
 *
 * Constructs a new event object for the given arguments.
 * 
 * Parameters:
 * 
 * evt - Native mouse event.
 * state - Optional <mxCellState> under the mouse.
 * 
 */
export class MxMouseEvent {

	/**
	 * Holds the inner event object.
	 */
	evt = null;
	/**
	 * Holds the optional <MxCellState> associated with this event.
	 * @type {MxCellState}
	 */
	state = null;
	/**
	 * Holds the <MxCellState> that was passed to the constructor. This can be
	 * different from <state> depending on the result of <MxGraph.getEventState>.
	 * @type {MxCellState}
	 */
	sourceState = null;
	/**
	 * Holds the consumed state of this event.
	 * @type {boolean}
	 */
	consumed = false;
	/**
	 * Holds the x-coordinate of the event in the graph. This value is set in
	 * <MxGraph.fireMouseEvent>.
	 * @type {null}
	 */
	graphX = null;

	/**
	 * Holds the y-coordinate of the event in the graph. This value is set in
	 * <MxGraph.fireMouseEvent>.
	 * @type {null}
	 */
	graphY = null;

	constructor(evt, state) {
		this.evt = evt;
		this.state = state;
		this.sourceState = state;
	}

	/**
	 *
	 * @returns {null}
	 */
	getEvent() {
		return this.evt;
	}

	/**
	 * Returns the target DOM element using <MxEvent.getSource> for <evt>.
	 * @returns {*}
	 */
	getSource() {
		return MxEvent.getSource(this.evt);
	}

	/**
	 * Returns true if the given <MxShape> is the source of <evt>.
	 * @param shape
	 * @returns {boolean}
	 */
	isSource(shape) {
		if (shape != null) {
			return MxUtils.isAncestorNode(shape.node, this.getSource());
		}

		return false;
	}

	/**
	 *
	 * @returns {*}
	 */
	getX() {
		return MxEvent.getClientX(this.getEvent());
	}

	getY() {
		return MxEvent.getClientY(this.getEvent());
	}

	getGraphX() {
		return this.graphX;
	}

	getGraphY() {
		return this.graphY;
	}

	getState() {
		return this.state;
	}

	/**
	 * Returns the <mxCell> in <state> is not null.
	 */
	getCell() {
		const state = this.getState();

		if (state != null) {
			return state.cell;
		}

		return null;
	}

	/**
	 * Returns true if the event is a popup trigger.
	 * @returns {boolean}
	 */
	isPopupTrigger() {
		return MxEvent.isPopupTrigger(this.getEvent());
	}

	isConsumed() {
		return this.consumed;
	}

	/**
	 * Sets <consumed> to true and invokes preventDefault on the native event
	 * if such a method is defined. This is used mainly to avoid the cursor from
	 * being changed to a text cursor in Webkit. You can use the preventDefault
	 * flag to disable this functionality.
	 * @param preventDefaultParam Specifies if the native event should be canceled. Default
	 * is true.
	 */
	consume(preventDefaultParam) {
		const preventDefault = (preventDefaultParam != null) ? preventDefaultParam :
			(this.evt.touches != null || MxEvent.isMouseEvent(this.evt));

		if (preventDefault && this.evt.preventDefault) {
			this.evt.preventDefault();
		}

		// Workaround for images being dragged in IE
		// Does not change returnValue in Opera
		if (MxClient.IS_IE) {
			this.evt.returnValue = true;
		}

		// Sets local consumed state
		this.consumed = true;
	}
}
