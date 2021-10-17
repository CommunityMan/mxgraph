import {MxUtils} from "./MxUtils";

/**
 * Class: mxPoint
 *
 * Implements a 2-dimensional vector with double precision coordinates.
 * 
 * Constructor: mxPoint
 *
 * Constructs a new point for the optional x and y coordinates. If no
 * coordinates are given, then the default values for <x> and <y> are used.
 */
export class MxPoint {
	/**
	 * Holds the x-coordinate of the point. Default is 0.
	 * @type {null}
	 */
	x = null;
	/**
	 * Holds the y-coordinate of the point. Default is 0.
	 * @type {null}
	 */
	y = null;

	constructor(x, y) {
		this.x = (x != null) ? x : 0;
		this.y = (y != null) ? y : 0;
	}

	/**
	 * Returns true if the given object equals this point.
	 * @param obj
	 * @returns {boolean}
	 */
	equals(obj) {
		return obj != null && obj.x == this.x && obj.y == this.y;
	}

	/**
	 * Returns a clone of this <MxPoint>.
	 * @returns {MxPoint}
	 */
	clone() {
		return MxUtils.clone(this);
	}
}
