!(function ($) {
	/* CHECKBOX PUBLIC CLASS DEFINITION
  * ============================== */

	const Checkbox = function (element, options) {
		this.init(element, options);
	};

	Checkbox.prototype = {

		constructor: Checkbox,

		 init(element, options) {
			const $el = this.$element = $(element);

			this.options = $.extend({}, $.fn.checkbox.defaults, options);
			$el.before(this.options.template);
			this.setState();
		},

		 setState() {
			const $el = this.$element;
			const $parent = $el.closest(".checkbox");

			$el.prop("disabled") && $parent.addClass("disabled");
			$el.prop("checked") && $parent.addClass("checked");
		},

		 toggle() {
			const ch = "checked";
			const $el = this.$element;
			const $parent = $el.closest(".checkbox");
			const checked = $el.prop(ch);
			const e = $.Event("toggle");

			if ($el.prop("disabled") == false) {
				$parent.toggleClass(ch) && checked ? $el.removeAttr(ch) : $el.prop(ch, ch);
				$el.trigger(e).trigger("change");
			}
		},

		 setCheck(option) {
			const d = "disabled";
			const ch = "checked";
			const $el = this.$element;
			const $parent = $el.closest(".checkbox");
			const checkAction = option == "check";
			const e = $.Event(option);

			$parent[checkAction ? "addClass" : "removeClass"](ch) && checkAction ? $el.prop(ch, ch) : $el.removeAttr(ch);
			$el.trigger(e).trigger("change");
		},

	};


	/* CHECKBOX PLUGIN DEFINITION
  * ======================== */

	const old = $.fn.checkbox;

	$.fn.checkbox = function (option) {
		return this.each(function () {
			const $this = $(this);
			let data = $this.data("checkbox");
			const options = $.extend({}, $.fn.checkbox.defaults, $this.data(), typeof option === "object" && option);
			if (!data) $this.data("checkbox", (data = new Checkbox(this, options)));
			if (option == "toggle") data.toggle();
			if (option == "check" || option == "uncheck") data.setCheck(option);
			else if (option) data.setState();
		});
	};

	$.fn.checkbox.defaults = {
		template: "<span class=\"icons\"><span class=\"first-icon fa fa-square fa-base\"></span><span class=\"second-icon fa fa-check-square fa-base\"></span></span>",
	};


	/* CHECKBOX NO CONFLICT
  * ================== */

	$.fn.checkbox.noConflict = function () {
		$.fn.checkbox = old;
		return this;
	};


	/* CHECKBOX DATA-API
  * =============== */

	$(document).on("click.checkbox.data-api", "[data-toggle^=checkbox], .checkbox", (e) => {
		let $checkbox = $(e.target);
		if (e.target.tagName != "A") {
			e && e.preventDefault() && e.stopPropagation();
			if (!$checkbox.hasClass("checkbox")) $checkbox = $checkbox.closest(".checkbox");
			$checkbox.find(":checkbox").checkbox("toggle");
		}
	});

	$(() => {
		$("input[type=\"checkbox\"]").each(function () {
			const $checkbox = $(this);
			$checkbox.checkbox();
		});
	});
}(window.jQuery));

/* =============================================================
 * flatui-radio v0.0.3
 * ============================================================ */

!(function ($) {
	/* RADIO PUBLIC CLASS DEFINITION
  * ============================== */

	const Radio = function (element, options) {
		this.init(element, options);
	};

	Radio.prototype = {

		constructor: Radio,

		 init(element, options) {
			const $el = this.$element = $(element);

			this.options = $.extend({}, $.fn.radio.defaults, options);
			$el.before(this.options.template);
			this.setState();
		},

		 setState() {
			const $el = this.$element;
			const $parent = $el.closest(".radio");

			$el.prop("disabled") && $parent.addClass("disabled");
			$el.prop("checked") && $parent.addClass("checked");
		},

		 toggle() {
			const d = "disabled";
			const ch = "checked";
			const $el = this.$element;
			const checked = $el.prop(ch);
			const $parent = $el.closest(".radio");
			const $parentWrap = $el.closest("form").length ? $el.closest("form") : $el.closest("body");
			const $elemGroup = $parentWrap.find(`:radio[name="${$el.attr("name")}"]`);
			const e = $.Event("toggle");

			if ($el.prop(d) == false) {
				$elemGroup.not($el).each(function () {
					const $el = $(this);
					const $parent = $(this).closest(".radio");

					if ($el.prop(d) == false) {
						$parent.removeClass(ch) && $el.removeAttr(ch).trigger("change");
					}
				});

				if (checked == false) $parent.addClass(ch) && $el.prop(ch, true);
				$el.trigger(e);

				if (checked !== $el.prop(ch)) {
					$el.trigger("change");
				}
			}
		},

		 setCheck(option) {
			const ch = "checked";
			const $el = this.$element;
			const $parent = $el.closest(".radio");
			const checkAction = option == "check";
			const checked = $el.prop(ch);
			const $parentWrap = $el.closest("form").length ? $el.closest("form") : $el.closest("body");
			const $elemGroup = $parentWrap.find(`:radio[name="${$el.attr("name")}"]`);
			const e = $.Event(option);

			$elemGroup.not($el).each(function () {
				const $el = $(this);
				const $parent = $(this).closest(".radio");

				$parent.removeClass(ch) && $el.removeAttr(ch);
			});

			$parent[checkAction ? "addClass" : "removeClass"](ch) && checkAction ? $el.prop(ch, ch) : $el.removeAttr(ch);
			$el.trigger(e);

			if (checked !== $el.prop(ch)) {
				$el.trigger("change");
			}
		},

	};


	/* RADIO PLUGIN DEFINITION
  * ======================== */

	const old = $.fn.radio;

	$.fn.radio = function (option) {
		return this.each(function () {
			const $this = $(this);
			let data = $this.data("radio");
			const options = $.extend({}, $.fn.radio.defaults, $this.data(), typeof option === "object" && option);
			if (!data) $this.data("radio", (data = new Radio(this, options)));
			if (option == "toggle") data.toggle();
			if (option == "check" || option == "uncheck") data.setCheck(option);
			else if (option) data.setState();
		});
	};

	$.fn.radio.defaults = {
		template: "<span class=\"icons\"><span class=\"first-icon fa fa-circle-o fa-base\"></span><span class=\"second-icon fa fa-dot-circle-o fa-base\"></span></span>",
	};


	/* RADIO NO CONFLICT
  * ================== */

	$.fn.radio.noConflict = function () {
		$.fn.radio = old;
		return this;
	};


	/* RADIO DATA-API
  * =============== */

	$(document).on("click.radio.data-api", "[data-toggle^=radio], .radio", (e) => {
		let $radio = $(e.target);
		e && e.preventDefault() && e.stopPropagation();
		if (!$radio.hasClass("radio")) $radio = $radio.closest(".radio");
		$radio.find(":radio").radio("toggle");
	});

	$(() => {
		$("input[type=\"radio\"]").each(function () {
			const $radio = $(this);
			$radio.radio();
		});
	});
}(window.jQuery));
