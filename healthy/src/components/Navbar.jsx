
import DHIlab from "./DHIlab/DHIlab";

const Navbar = () => {
 
  return (
    <div id="Navbar">
      <div class="usa-overlay"></div>
      <header class="usa-header usa-header--basic usa-header--megamenu padding-bottom-4 padding-top-6">
        <div class="usa-nav-container">
          <div class="usa-navbar">
            <div class="usa-logo margin-0" id="basic-mega-logo">
              <em class="usa-logo__text">
                <div className="display-flex flex-row align-items-center">
                  <DHIlab />
                  <h2 className="display-inline-block padding-left-1 ">SymoSync - One way stop to check potential diseases</h2>

                </div>
              </em>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;