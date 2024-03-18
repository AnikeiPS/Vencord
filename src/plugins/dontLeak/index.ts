import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import styles from "./style.css?managed";
import { definePluginSettings } from "@api/Settings";
import { disableStyle, enableStyle } from "@api/Styles";

const settings = definePluginSettings({
    hoverToView: {
        type: OptionType.BOOLEAN,
        description: "When hovering over a message, show the contents.",
        default: false,
        restartNeeded: false,
        onChange: () => {
            updateClassList("hoverToView", settings.store.hoverToView);
        },
    },
    keybind: {
        type: OptionType.STRING,
        description: "The keybind to show the contents of a message.",
        default: "Insert",
        restartNeeded: false,
    }
});

export default definePlugin({
    name: "Don't Leak!",
    description: "Hide all message contents and attachments when you're streaming.",
    authors: [
        {
            id: 1101508982570504244n,
            name: "Perny",
        }, 
        Devs.ANIKEIPS
    ],
    settings,
    start() {
        document.addEventListener("keyup", keyUpHandler);
        document.addEventListener("keydown", keyDownHandler);
        updateClassList("hoverToView", settings.store.hoverToView);
        enableStyle(styles);
    },
    stop() {
        document.removeEventListener("keyup", keyUpHandler);
        document.removeEventListener("keydown", keyDownHandler);
        disableStyle(styles);
    },
});

function updateClassList(className, condition) {
    if (condition) {
        document.body.classList.add(className);
        return;
    }
    document.body.classList.remove(className);
}

function keyUpHandler(e: KeyboardEvent) {
    if (e.key !== settings.store.keybind) return;
    document.body.classList.remove("youcanleaknow");
}

function keyDownHandler(e: KeyboardEvent) {
    if (e.key !== settings.store.keybind) return;
    document.body.classList.add("youcanleaknow");
}
