import b4w from "blend4web";
import m_rgba from "../node_modules/blend4web/src/extern/rgba.js";

const m_app       = b4w.app;
const m_data      = b4w.data;
const m_cont      = b4w.container; //not default
const m_mouse     = b4w.mouse; //not default
const m_scenes    = b4w.scenes; //not default
const m_mat       = b4w.material;
const m_storage   = b4w.storage;

let _previous_selected_obj = null;

const APP_ASSETS_PATH = "quadralab_assets/";


let ALREADY_RUNNING = false;


export const init_app = () => {

   if (!ALREADY_RUNNING) {
        ALREADY_RUNNING = true;
        m_app.init({
            canvas_container_id: "b4w",
            callback: init_cb,
            autoresize: true,
            pause_invisible:true,
        });
    } else {
        m_data.unload();
        m_app.init({
            canvas_container_id: "b4w",
            callback: init_cb,
            autoresize: true,

        })
    }
};

const init_cb = (canvas_elem, success) => {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

     // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

const load = () => {
    let preloader_cont = document.getElementById("preloader_cont");
    preloader_cont.style.visibility = "visible";
    m_data.load(APP_ASSETS_PATH + "diffuseur.json", load_cb, preloader_cb); //point this at your .json
}

const preloader_cb = (percentage) => {
    let prelod_dynamic_path = document.getElementById("prelod_dynamic_path");
    let logo_cont = document.getElementById("logo_container");
    //let percentage_num      = prelod_dynamic_path.nextElementSibling;

    prelod_dynamic_path.style.width = percentage + "%";
    if (percentage === 100) {
        let preloader_cont = document.getElementById("preloader_cont");
        preloader_cont.style.visibility = "hidden";
        logo_cont.style.visibility = "hidden";
        return;
    }
}

const load_cb = (data_id, success) => {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();  //not default

    // place your code here
    var canvas_elem = m_cont.get_canvas(); //not default
    canvas_elem.addEventListener("mousedown", main_canvas_click, false); //not default
    canvas_elem.addEventListener("touchstart", main_canvas_click, false); //not default

    let getAll = document.getElementById("getAll");
    let random = document.getElementById("random");
    let pair = document.getElementById("pair");

    getAll.addEventListener("click", changeAllColor, false);
    random.addEventListener("click", changeRandomColor, false);
    pair.addEventListener("click", changesmallRandomColor, false);


}

const main_canvas_click = (e) => {
    if (e.preventDefault)
        e.preventDefault();

    var x = m_mouse.get_coords_x(e);
    var y = m_mouse.get_coords_y(e);

    var obj = m_scenes.pick_object(x, y);

    if (obj) {
        _previous_selected_obj = obj;
        // place your code here
        changeColor(obj.name);

    }
}

const changeColor = (ObjName) => {
  var carreau = m_scenes.get_object_by_name(ObjName);
  var b =  m_storage.get("couleur").split(',').map(Number);
  var color = m_rgba.css_to_rgba(b[0], b[1], b[2], b[3]);
  m_mat.set_diffuse_color(carreau, "mat", m_rgba.from_values(color[0], color[1], color[2], color[3]));
  m_storage.cleanup("couleur")
  console.log(m_rgba.create());
};

const changeAllColor = () => {
  var carreau = m_scenes.get_all_objects("MESH");
  var b =  m_storage.get("couleur").split(',').map(Number);
  var color = m_rgba.css_to_rgba(b[0], b[1], b[2], b[3]);
  carreau.map((x, i) => {
    m_mat.set_diffuse_color(x, "mat", m_rgba.from_values(color[0], color[1], color[2], color[3]));
  })
  m_storage.cleanup("couleur")
};

const changeRandomColor = () => {
  var carreau = m_scenes.get_all_objects("MESH");
  carreau.map((x, i) => {
    var color = m_rgba.css_to_rgba(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255),Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
    m_mat.set_diffuse_color(x, "mat", m_rgba.from_values(color[0], color[1], color[2], color[3]));
  })
  m_storage.cleanup("couleur")
};

const changesmallRandomColor = () => {
  var carreau = m_scenes.get_all_objects("MESH");
  var b =  m_storage.get("couleur").split(',').map(Number);
  var color = m_rgba.css_to_rgba(b[0], b[1], b[2], b[3]);
  carreau.map((x, i) => {
    if (Math.floor(Math.random() * 10)%4 === 0) {
      m_mat.set_diffuse_color(x, "mat", m_rgba.from_values(color[0], color[1], color[2], color[3]));
    }

  })
  m_storage.cleanup("couleur")
};
