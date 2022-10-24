/*!

 =========================================================
 * Paper Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */


const fixedTop = false;
let transparent = true;
const navbar_initialized = false;
let mobile_menu_initialized = false;

$(document).ready(() => {
	window_width = $(window).width();

	// Init navigation toggle for small screens
	if (window_width <= 991) {
		pd.initRightMenu();
	}

	//  Activate the tooltips
	$("[rel=\"tooltip\"]").tooltip();
});

$(document).on("click", ".navbar-toggle", function () {
	$toggle = $(this);
	if (pd.misc.navbar_menu_visible == 1) {
		$("html").removeClass("nav-open");
		pd.misc.navbar_menu_visible = 0;
		$("#bodyClick").remove();
		setTimeout(() => {
			$toggle.removeClass("toggled");
		}, 400);
	} else {
		setTimeout(() => {
			$toggle.addClass("toggled");
		}, 430);

		div = "<div id=\"bodyClick\"></div>";
		$(div).appendTo("body").click(() => {
			$("html").removeClass("nav-open");
			pd.misc.navbar_menu_visible = 0;
			$("#bodyClick").remove();
			setTimeout(() => {
				$toggle.removeClass("toggled");
			}, 400);
		});

		$("html").addClass("nav-open");
		pd.misc.navbar_menu_visible = 1;
	}
});

// activate collapse right menu when the windows is resized
$(window).resize(() => {
	if ($(window).width() <= 991) {
		pd.initRightMenu();
	}
});

pd = {
	misc: {
		navbar_menu_visible: 0,
	},
	checkScrollForTransparentNavbar: debounce(() => {
		if ($(document).scrollTop() > 381) {
			if (transparent) {
				transparent = false;
				$(".navbar-color-on-scroll").removeClass("navbar-transparent");
				$(".navbar-title").removeClass("hidden");
			}
		} else if (!transparent) {
			transparent = true;
			$(".navbar-color-on-scroll").addClass("navbar-transparent");
			$(".navbar-title").addClass("hidden");
		}
	}),
	initRightMenu: debounce(() => {
		const $sidebar_wrapper = $(".sidebar-wrapper");
		const $sidebar = $(".sidebar");

		if (!mobile_menu_initialized) {
			const $navbar = $("nav").find(".navbar-collapse").children(".navbar-nav");

			mobile_menu_content = "";

			nav_content = $navbar.html();

			nav_content = `<ul class="nav nav-mobile-menu">${nav_content}</ul>`;

			$sidebar_nav = $sidebar_wrapper.find(" > .nav");

			// insert the navbar form before the sidebar list
			$sidebar.addClass("off-canvas-sidebar");
			$nav_content = $(nav_content);
			$nav_content.insertBefore($sidebar_nav);

			$(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click((event) => {
				event.stopPropagation();
			});

			// simulate resize so all the charts/maps will be redrawn
			window.dispatchEvent(new Event("resize"));

			mobile_menu_initialized = true;
		} else if ($(window).width() > 991) {
			// reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
			$sidebar_wrapper.find(".nav-mobile-menu").remove();
			$sidebar.removeClass("off-canvas-sidebar");

			mobile_menu_initialized = false;
		}
	}, 200),
};


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	let timeout;
	return function () {
		const context = this; const
			args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}
