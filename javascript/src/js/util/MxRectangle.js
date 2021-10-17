import {MxPoint} from "./MxPoint";

/**
 * Class: mxRectangle
 *
 * Extends <mxPoint> to implement a 2-dimensional rectangle with double
 * precision coordinates.
 * 
 * Constructor: mxRectangle
 *
 * Constructs a new rectangle for the optional parameters. If no parameters
 * are given then the respective default values are used.
 */
export class MxRectangle extends MxPoint {

	width = null;
	height = null;

	constructor(x, y, width, height) {
		super(x, y);
		this.width = (width != null) ? width : 0;
		this.height = (height != null) ? height : 0;
	}

	/**
	 * Sets this rectangle to the specified values
	 * @param x
	 * @param y
	 * @param w
	 * @param h
	 */
	setRect(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}

	/**
	 * Returns the x-coordinate of the center point.
	 * @returns {number}
	 */
	getCenterX() {
		return this.x + this.width/2;
	}

	/**
	 * Returns the y-coordinate of the center point.
	 * @returns {number}
	 */
	getCenterY() {
		return this.y + this.height/2;
	}

	/**
	 * Adds the given rectangle to this rectangle.
	 * @param rect
	 */
	add(rect) {
		if (rect != null) {
			let minX = Math.min(this.x, rect.x);
			let minY = Math.min(this.y, rect.y);
			let maxX = Math.max(this.x + this.width, rect.x + rect.width);
			let maxY = Math.max(this.y + this.height, rect.y + rect.height);

			this.x = minX;
			this.y = minY;
			this.width = maxX - minX;
			this.height = maxY - minY;
		}
	}


	/**
	 * Changes this rectangle to where it overlaps with the given rectangle.
	 * @param rect
	 */
	intersect(rect) {
		if (rect != null) {
			let r1 = this.x + this.width;
			let r2 = rect.x + rect.width;

			let b1 = this.y + this.height;
			let b2 = rect.y + rect.height;

			this.x = Math.max(this.x, rect.x);
			this.y = Math.max(this.y, rect.y);
			this.width = Math.min(r1, r2) - this.x;
			this.height = Math.min(b1, b2) - this.y;
		}
	};

	/**
	 * Grows the rectangle by the given amount, that is, this method subtracts
	 * the given amount from the x- and y-coordinates and adds twice the amount
	 * to the width and height.
	 * @param amount
	 * @returns {MxRectangle}
	 */
	grow(amount) {
		this.x -= amount;
		this.y -= amount;
		this.width += 2 * amount;
		this.height += 2 * amount;

		return this;
	}

	/**
	 * Returns the top, left corner as a new <MxPoint>.
	 * @returns {MxPoint}
	 */
	getPoint() {
		return new MxPoint(this.x, this.y);
	}

	/**
	 * Rotates this rectangle by 90 degree around its center point.
	 */
	rotate90() {
		let t = (this.width - this.height) / 2;
		this.x += t;
		this.y -= t;
		let tmp = this.width;
		this.width = this.height;
		this.height = tmp;
	}

	/**
	 * Returns true if the given object equals this rectangle.
	 * @param obj
	 * @returns {boolean}
	 */
	equals(obj) {
		return obj != null && obj.x === this.x && obj.y === this.y &&
			obj.width === this.width && obj.height === this.height;
	}

	/**
	 * Returns a new <MxRectangle> which is a copy of the given rectangle.
	 * @param rect
	 * @returns {MxRectangle}
	 */
	fromRectangle = function(rect) {
		return new MxRectangle(rect.x, rect.y, rect.width, rect.height);
	}
}
