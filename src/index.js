import CommandsKeyPress from "./commands-keypress.js";
import Game from "./components/game.js";
import { Configuration } from "./configuration.js";
import RendererHtml from "./rendererHtml.js";

let game = new Game(new CommandsKeyPress(document.body, Configuration), new RendererHtml(document.body));