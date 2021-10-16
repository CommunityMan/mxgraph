import { MxClient } from '../MxClient.js';
import { MxUtils } from './MxUtils.js';
import { MxEvent } from './MxEvent.js';
import { MxWindow } from './MxWindow.js';
export class MxLog {
	/**
	 * Class: MxLog
	 *
	 * A singleton class that implements a simple console.
	 *
	 * Variable: consoleName
	 *
	 * Specifies the name of the console window. Default is 'Console'.
	 */
	static consoleName = 'Console';

	/**
	 * Variable: TRACE
	 *
	 * Specified if the output for <enter> and <leave> should be visible in the
	 * console. Default is false.
	 */
	static TRACE = false;

	/**
	 * Variable: DEBUG
	 *
	 * Specifies if the output for <debug> should be visible in the console.
	 * Default is true.
	 */
	static DEBUG = true;

	/**
	 * Variable: WARN
	 *
	 * Specifies if the output for <warn> should be visible in the console.
	 * Default is true.
	 */
	static WARN = true;

	/**
	 * Variable: buffer
	 *
	 * Buffer for pre-initialized content.
	 */
	static buffer = '';

	/**
	 * Function: init
	 *
	 * Initializes the DOM node for the console. This requires document.body to
	 * point to a non-null value. This is called from within <setVisible> if the
	 * log has not yet been initialized.
	 */
	static init() {
		if (MxLog.window == null && document.body != null) {
			let title = MxLog.consoleName + ' - mxGraph ' + MxClient.VERSION;

			// Creates a table that maintains the layout
			let table = document.createElement('table');
			table.setAttribute('width', '100%');
			table.setAttribute('height', '100%');

			let tbody = document.createElement('tbody');
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			td.style.verticalAlign = 'top';

			// Adds the actual console as a textarea
			MxLog.textarea = document.createElement('textarea');
			MxLog.textarea.setAttribute('wrap', 'off');
			MxLog.textarea.setAttribute('readOnly', 'true');
			MxLog.textarea.style.height = '100%';
			MxLog.textarea.style.resize = 'none';
			MxLog.textarea.value = mxLog.buffer;

			// Workaround for wrong width in standards mode
			if (MxClient.IS_NS && document.compatMode !== 'BackCompat') {
				MxLog.textarea.style.width = '99%';
			}
			else {
				MxLog.textarea.style.width = '100%';
			}

			td.appendChild(MxLog.textarea);
			tr.appendChild(td);
			tbody.appendChild(tr);

			// Creates the container div
			tr = document.createElement('tr');
			MxLog.td = document.createElement('td');
			MxLog.td.style.verticalAlign = 'top';
			MxLog.td.setAttribute('height', '30px');

			tr.appendChild(MxLog.td);
			tbody.appendChild(tr);
			table.appendChild(tbody);

			// Adds various debugging buttons
			MxLog.addButton('Info', () => {
				MxLog.info();
			});

			MxLog.addButton('DOM', () => {
				let content = MxUtils.getInnerHtml(document.body);
				MxLog.debug(content);
			});

			MxLog.addButton('Trace', () => {
				MxLog.TRACE = !MxLog.TRACE;

				if (MxLog.TRACE) {
					MxLog.debug('Tracing enabled');
				}
				else {
					MxLog.debug('Tracing disabled');
				}
			});

			MxLog.addButton('Copy', () => {
				try {
					MxUtils.copy(MxLog.textarea.value);
				}
				catch (err) {
					MxUtils.alert(err);
				}
			});

			MxLog.addButton('Show', () => {
				try {
					MxUtils.popup(MxLog.textarea.value);
				}
				catch (err) {
					MxUtils.alert(err);
				}
			});

			MxLog.addButton('Clear', () => {
				MxLog.textarea.value = '';
			});

			// Cross-browser code to get window size
			let h = 0;
			let w = 0;

			if (typeof(window.innerWidth) === 'number') {
				h = window.innerHeight;
				w = window.innerWidth;
			}
			else {
				h = (document.documentElement.clientHeight || document.body.clientHeight);
				w = document.body.clientWidth;
			}

			MxLog.window = new MxWindow(title, table, Math.max(0, w - 320), Math.max(0, h - 210), 300, 160);
			MxLog.window.setMaximizable(true);
			MxLog.window.setScrollable(false);
			MxLog.window.setResizable(true);
			MxLog.window.setClosable(true);
			MxLog.window.destroyOnClose = false;

			// Workaround for ignored textarea height in various setups
			if (((MxClient.IS_NS || MxClient.IS_IE) && !MxClient.IS_GC &&
					!MxClient.IS_SF && document.compatMode !== 'BackCompat') ||
				document.documentMode === 11) {
				let elt = MxLog.window.getElement();

				let resizeHandler = () => {
					MxLog.textarea.style.height = Math.max(0, elt.offsetHeight - 70) + 'px';
				};

				MxLog.window.addListener(MxEvent.RESIZE_END, resizeHandler);
				MxLog.window.addListener(MxEvent.MAXIMIZE, resizeHandler);
				MxLog.window.addListener(MxEvent.NORMALIZE, resizeHandler);

				MxLog.textarea.style.height = '92px';
			}
		}
	}

	/**
	 * Function: info
	 *
	 * Writes the current navigator information to the console.
	 */
	static info() {
		MxLog.writeln(MxUtils.toString(navigator));
	}

	/**
	 * Function: addButton
	 *
	 * Adds a button to the console using the given label and function.
	 */
	static addButton(lab, funct) {
		let button = document.createElement('button');
		MxUtils.write(button, lab);
		MxEvent.addListener(button, 'click', funct);
		MxLog.td.appendChild(button);
	}

	/**
	 * Function: isVisible
	 *
	 * Returns true if the console is visible.
	 */
	static isVisible(){
		if (MxLog.window != null) {
			return MxLog.window.isVisible();
		}

		return false;
	}


	/**
	 * Function: show
	 *
	 * Shows the console.
	 */
	static show() {
		MxLog.setVisible(true);
	}

	/**
	 * Function: setVisible
	 *
	 * Shows or hides the console.
	 */
	static setVisible(visible) {
		if (MxLog.window == null) {
			MxLog.init();
		}

		if (MxLog.window != null) {
			MxLog.window.setVisible(visible);
		}
	}

	/**
	 * Function: enter
	 *
	 * Writes the specified string to the console
	 * if <TRACE> is true and returns the current
	 * time in milliseconds.
	 *
	 * Example:
	 *
	 * (code)
	 * MxLog.show();
	 * var t0 = MxLog.enter('Hello');
	 * // Do something
	 * MxLog.leave('World!', t0);
	 * (end)
	 */
	static enter(string) {
		if (MxLog.TRACE) {
			MxLog.writeln('Entering '+string);

			return new Date().getTime();
		}
	}

	/**
	 * Function: leave
	 *
	 * Writes the specified string to the console
	 * if <TRACE> is true and computes the difference
	 * between the current time and t0 in milliseconds.
	 * See <enter> for an example.
	 */
	static leave(string, t0) {
		if (MxLog.TRACE) {
			let dt = (t0 !== 0) ? ' ('+(new Date().getTime() - t0)+' ms)' : '';
			MxLog.writeln('Leaving '+string+dt);
		}
	}

	/**
	 * Function: debug
	 *
	 * Adds all arguments to the console if <DEBUG> is enabled.
	 *
	 * Example:
	 *
	 * (code)
	 * MxLog.show();
	 * MxLog.debug('Hello, World!');
	 * (end)
	 */
	static debug() {
		if (MxLog.DEBUG) {
			MxLog.writeln.apply(this, arguments);
		}
	}

	/**
	 * Function: warn
	 *
	 * Adds all arguments to the console if <WARN> is enabled.
	 *
	 * Example:
	 *
	 * (code)
	 * MxLog.show();
	 * MxLog.warn('Hello, World!');
	 * (end)
	 */
	static warn() {
		if (MxLog.WARN) {
			MxLog.writeln.apply(this, arguments);
		}
	}

	/**
	 * Function: write
	 *
	 * Adds the specified strings to the console.
	 */
	static write() {
		let string = '';

		for (let i = 0; i < arguments.length; i++) {
			string += arguments[i];

			if (i < arguments.length - 1) {
				string += ' ';
			}
		}

		if (MxLog.textarea != null) {
			MxLog.textarea.value = MxLog.textarea.value + string;

			// Workaround for no update in Presto 2.5.22 (Opera 10.5)
			if (navigator.userAgent != null &&
				navigator.userAgent.indexOf('Presto/2.5') >= 0) {
				MxLog.textarea.style.visibility = 'hidden';
				MxLog.textarea.style.visibility = 'visible';
			}

			MxLog.textarea.scrollTop = MxLog.textarea.scrollHeight;
		}
		else {
			MxLog.buffer += string;
		}
	}

	/**
	 * Function: writeln
	 *
	 * Adds the specified strings to the console, appending a linefeed at the
	 * end of each string.
	 */
	static writeln() {
		let string = '';

		for (let i = 0; i < arguments.length; i++) {
			string += arguments[i];

			if (i < arguments.length - 1) {
				string += ' ';
			}
		}

		MxLog.write(string + '\n');
	}
}