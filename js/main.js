// Print Product
function print_products() {
  document.getElementById("produt_list").innerHTML = "";
  var product = JSON.parse(localStorage.getItem("echo_products"));
  for (let i = 0; i < product.length; i++) {
    var categories_list = JSON.parse(localStorage.getItem("echo_settings"));
    if (product[i].categories == categories_list[0].select_categories || "all" == categories_list[0].select_categories) {
      var Note_list =
        `     <div class="products" onclick="show_detalis(` +
        product[i].id +
        `)" data-drawer-trigger aria-controls="drawer-name" aria-expanded="false">
  <div class="img">
    <img src="` +
        product[i].image +
        `" alt="" />
  </div>
  <div class="pro_details">
    <div class="pro_heading">` +
        product[i].name +
        `</div>
    <div class="pro_decs"><p>` +
        product[i].note +
        `</p></div>
    <div class="pro_rates">
    
      <span>Rs. ` +
        product[i].price +
        `</span>
      <span><s>Rs.1200</s></span>
      <!-- <span>60% OFF</span> -->
    </div>
  </div>
</div>`;
      document.getElementById("produt_list").innerHTML += Note_list;
    }
  }
}
// Print Product End
print_products();

// Categories Menua
function categories_menua() {
  document.getElementById("categories_menu").innerHTML = "";
  var categories = JSON.parse(localStorage.getItem("echo_categories"));
  for (let i = 0; i < categories.length; i++) {
    var Note_list = `<li><a onclick="categories_filter('` + categories[i].categories + `')">` + categories[i].categories + `</a></li>`;
    document.getElementById("categories_menu").innerHTML += Note_list;
  }
}

function categories_filter(a) {
  var settings = JSON.parse(localStorage.getItem("echo_settings"));

  for (var i = 0; i < settings.length; i++) {
    if (settings[0] == settings[i]) {
      settings[0].select_categories = a;
      localStorage.setItem("echo_settings", JSON.stringify(settings));
      print_products();
    }
  }
}
categories_menua();
// Categories Menua End

// Show Details
function show_detalis(a) {
  document.getElementById("products_detail").innerHTML = "";
  var product = JSON.parse(localStorage.getItem("echo_products"));
  for (var i = 0; i < product.length; i++) {
    if (a == product[i].id) {
      var Note_list =
        `
        <div class="products_detail">
        <div class="product_detail_img_side">
          <div class="product_detail_img">
            <img src="` +
        product[i].image +
        `" alt="" />
          </div>
          <div class="product_detail_btns">
            <button>Add To Cart</button>
            <button>BUy Now</button>
          </div>
        </div>
        <div class="product_detail_dec">
          <div class="product_detail_heading">
            <h2>` +
        product[i].name +
        `</h2>
          </div>
          <div class="product_detail_reviews">
            <span>199 Ratings & 34 Reviews</span>
          </div>
          <div class="product_detail_rate">
            <span>` +
        product[i].price +
        `</span>
            <span><s>Rs. 1200</s></span>
          </div>

          <div class="product_detail_decs">
            <div class="product_detail_desc_heading">Description</div>
            <div class="product_detail_decs_p">
              <p>` +
        product[i].note +
        `</p>
            </div>
          </div>
        </div>
      </div>
        `;
      document.getElementById("products_detail").innerHTML += Note_list;
    }
  }
}

// Show Details end
// Hero

function hero() {
  var site_settings = JSON.parse(localStorage.getItem("echo_site_settings"));
  var hero_div = document.getElementById("hero");
  hero_div.style.backgroundImage = "url(" + site_settings.general.banner_image + ")";
  var hero_html =
    `<div class="hero_inner">
  <h2>
   ` +
    site_settings.general.site_banner_text +
    `
  </h2>

  <div class="search">
    <i class="bx bx-search-alt"></i>
    <input type="text" placeholder="Searching for..." />
  </div>
</div>`;
  document.getElementById("hero").innerHTML += hero_html;
}
hero();

// Service Bar

function service() {
  var site_settings = JSON.parse(localStorage.getItem("echo_site_settings"));

  for (var i = 0; i < site_settings.service.service_bar.length; i++) {
    var service_html =
      `<div class="service">
    <span>` +
      site_settings.service.service_bar[i].service_title +
      `</span>
    <span>` +
      site_settings.service.service_bar[i].service_spen +
      `</span>
  </div>`;
    document.getElementById("service_bar").innerHTML += service_html;
  }
}
service();
// Footer
function footer() {
  var site_settings = JSON.parse(localStorage.getItem("echo_site_settings"));

  var footer_div = document.getElementById("footer");
  var footer_html =
    `<div class="footer_grid">
<aside>
  <div class="logo">
    <span>` +
    site_settings.footer.logo +
    `</span>
  </div>
  <p>` +
    site_settings.footer.footer_desc +
    `</p>
</aside>
<aside>
  <ul id="footer_links" >

  </ul>
</aside>
</div>`;
  document.getElementById("footer").innerHTML += footer_html;

  for (var i = 0; i < site_settings.footer.links.length; i++) {
    var b = '<li><a href="' + site_settings.footer.links[i].link_href + '">' + site_settings.footer.links[i].link_name + "</a></li>";
    document.getElementById("footer_links").innerHTML += b;
  }
}
footer();

//  Slider
var drawer = function () {
  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
      var el = this;
      var ancestor = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (ancestor.matches(s)) return ancestor;
        ancestor = ancestor.parentElement;
      } while (ancestor !== null);
      return null;
    };
  }

  //
  // Settings
  //
  var settings = {
    speedOpen: 50,
    speedClose: 350,
    activeClass: "is-active",
    visibleClass: "is-visible",
    selectorTarget: "[data-drawer-target]",
    selectorTrigger: "[data-drawer-trigger]",
    selectorClose: "[data-drawer-close]",
  };

  //
  // Methods
  //

  // Toggle accessibility
  var toggleccessibility = function (event) {
    if (event.getAttribute("aria-expanded") === "true") {
      event.setAttribute("aria-expanded", false);
    } else {
      event.setAttribute("aria-expanded", true);
    }
  };

  // Open Drawer
  var openDrawer = function (trigger) {
    // Find target
    var target = document.getElementById(trigger.getAttribute("aria-controls"));

    // Make it active
    target.classList.add(settings.activeClass);

    // Make body overflow hidden so it's not scrollable
    document.documentElement.style.overflow = "hidden";

    // Toggle accessibility
    toggleccessibility(trigger);

    // Make it visible
    setTimeout(function () {
      target.classList.add(settings.visibleClass);
    }, settings.speedOpen);
  };

  // Close Drawer
  var closeDrawer = function (event) {
    // Find target
    var closestParent = event.closest(settings.selectorTarget),
      childrenTrigger = document.querySelector('[aria-controls="' + closestParent.id + '"');

    // Make it not visible
    closestParent.classList.remove(settings.visibleClass);

    // Remove body overflow hidden
    document.documentElement.style.overflow = "";

    // Toggle accessibility
    toggleccessibility(childrenTrigger);

    // Make it not active
    setTimeout(function () {
      closestParent.classList.remove(settings.activeClass);
    }, settings.speedClose);
  };

  // Click Handler
  var clickHandler = function (event) {
    // Find elements
    var toggle = event.target,
      open = toggle.closest(settings.selectorTrigger),
      close = toggle.closest(settings.selectorClose);

    // Open drawer when the open button is clicked
    if (open) {
      openDrawer(open);
    }

    // Close drawer when the close button (or overlay area) is clicked
    if (close) {
      closeDrawer(close);
    }

    // Prevent default link behavior
    if (open || close) {
      event.preventDefault();
    }
  };

  // Keydown Handler, handle Escape button
  var keydownHandler = function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      // Find all possible drawers
      var drawers = document.querySelectorAll(settings.selectorTarget),
        i;

      // Find active drawers and close them when escape is clicked
      for (i = 0; i < drawers.length; ++i) {
        if (drawers[i].classList.contains(settings.activeClass)) {
          closeDrawer(drawers[i]);
        }
      }
    }
  };

  //
  // Inits & Event Listeners
  //
  document.addEventListener("click", clickHandler, false);
  document.addEventListener("keydown", keydownHandler, false);
};

drawer();
