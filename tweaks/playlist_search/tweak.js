const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "tweak.css";
document.head.appendChild(link);

const s_video_list = "#contents.ytd-playlist-video-list-renderer";
const s_video = "#contents > ytd-playlist-video-renderer:nth-child";
const s_title_postfix = " #video-title";
const s_channel_postfix = " #channel-name #text > a";
const a_video_titles = [];
const a_video_channels = [];
const e_playlist_search_input_label = document.createElement("label");
e_playlist_search_input_label.for = "ek_yt_tweaks_playlist_search_input";
e_playlist_search_input_label.textContent = "Search Playlist:";
const e_playlist_search_input = document.createElement("input");
e_playlist_search_input.type = "search";
e_playlist_search_input.name = "ek_yt_tweaks_playlist_search_input";
e_playlist_search_input.id = "ek_yt_tweaks_playlist_search_input";
e_playlist_search_input.placeholder = "Search";
e_playlist_search_input.autocomplete = "on";

const e_playlist_search_form = document.createElement("form");
e_playlist_search_form.id = "ek_yt_tweaks_playlist_search_form";
const e_playlist_search_submit_button = document.createElement("button");
e_playlist_search_submit_button.innerHTML =
	"<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' viewBox='0 0 24 24' width='24' focusable='false' aria-hidden='true' style='pointer-events: none; display: inherit; width: 100%; height: 100%;'><path clip-rule='evenodd' d='M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z' fill-rule='evenodd'></path></svg>";
e_playlist_search_form.appendChild(e_playlist_search_input_label);
e_playlist_search_form.appendChild(e_playlist_search_input);
e_playlist_search_form.appendChild(e_playlist_search_submit_button);

e_playlist_search_form.style.color =
	"var(--ytd-searchbox-legacy-button-icon-color)";
e_playlist_search_form.style.backgroundColor = "var(--yt-spec-base-background)";
e_playlist_search_form.style.width = "40%";
// e_playlist_search_form.style.height = "32px";
e_playlist_search_form.style.marginBottom = "15px";
e_playlist_search_form.style.display = "flex";
e_playlist_search_form.style.justifyContent = "between";
e_playlist_search_form.style.alignItems = "stretch";
e_playlist_search_form.style.padding = "0 36px";

e_playlist_search_input_label.style.display = "none";
e_playlist_search_input.style.display = "inline-block";
e_playlist_search_submit_button.style.display = "inline-block";

e_playlist_search_input.style.width = "max-content";
e_playlist_search_submit_button.style.width = "fit-content";
e_playlist_search_submit_button.style.height = "fit-content";
e_playlist_search_submit_button.style.padding = "5px";

e_playlist_search_input.style.color =
	"var(--ytd-searchbox-legacy-button-icon-color)";
e_playlist_search_input.style.backgroundColor =
	"var(--yt-spec-base-background)";
e_playlist_search_input.style.borderRadius = "12px";
e_playlist_search_input.style.border =
	"1px solid var(--yt-spec-10-percent-layer)";
e_playlist_search_input.style.fontSize = "1.45em";
e_playlist_search_input.style.padding = "0 10px";
e_playlist_search_input.style.outline = "none";
e_playlist_search_input.style.flexGrow = "10";

e_playlist_search_submit_button.style.color =
	"var(--ytd-searchbox-legacy-button-icon-color)";
e_playlist_search_submit_button.style.backgroundColor =
	"var(--yt-spec-menu-background)";
e_playlist_search_submit_button.style.borderRadius = "12px";
e_playlist_search_submit_button.style.border =
	"1px solid var(--yt-spec-10-percent-layer)";
e_playlist_search_submit_button.style.cursor = "pointer";
e_playlist_search_submit_button.style.marginLeft = "5px";
e_playlist_search_submit_button.style.fontSize = "1.45em";
e_playlist_search_submit_button.style.fontWeight = "semibold";
e_playlist_search_submit_button.style.flexGrow = "0";

async function init() {
	await sleep(500);

	const e_video_list = document.querySelector(s_video_list);
	// console.log("EMKAB PLAYLIST SEARCH UP");
	if (e_video_list) {
		// console.log("EK YT TWEAKS: FOUND e_video_list");
		e_playlist_search_input.addEventListener("keydown", handleSubmit);
		e_playlist_search_submit_button.addEventListener("click", handleClick);
		e_video_list.parentNode.insertBefore(e_playlist_search_form, e_video_list);

		var observer = new MutationObserver(function (mutationsList) {
			searchInputChange({
				target: { value: e_playlist_search_input.value },
			});
		});

		observer.observe(document.querySelector(s_video_list), {
			attributes: false,
			characterData: true,
			childList: true,
			subtree: false,
		});
	}
}

function getPlaylistVideoMeta() {
	const e_video_list = document.querySelector(s_video_list);
	// console.log("EK YT TWEAKS: Meta updating.");
	for (let i = 1; i <= e_video_list.children.length; i++) {
		const e_video_title = document.querySelector(
			s_video + `(${i})` + s_title_postfix
		);

		const e_video_channel = document.querySelector(
			s_video + `(${i})` + s_channel_postfix
		);

		if (e_video_title)
			a_video_titles[i] = e_video_title.getAttribute("title").trim();
		if (e_video_channel)
			a_video_channels[i] = e_video_channel.textContent.trim();
	}
}

function handleSubmit(e) {
	if (e.code == "Enter") {
		e.preventDefault();
		searchInputChange(e);
	}
}

function handleClick(e) {
	e.preventDefault();
	searchInputChange({
		target: { value: e_playlist_search_input.value },
	});
}

function searchInputChange(e) {
	getPlaylistVideoMeta();
	// console.log("EKTEST: " + e);
	const e_video_list = document.querySelector(s_video_list);
	for (let i = 1; i <= e_video_list.children.length; i++) {
		if (a_video_titles[i])
			if (
				String(a_video_titles[i])
					.toLowerCase()
					.includes(e.target.value.toLowerCase()) ||
				String(a_video_channels[i])
					.toLowerCase()
					.includes(e.target.value.toLowerCase())
			) {
				document.querySelector(s_video + `(${i})`).style.visibility = "visible";
				document.querySelector(s_video + `(${i})`).style.display = "flex";
			} else {
				document.querySelector(s_video + `(${i})`).style.visibility = "hidden";
				document.querySelector(s_video + `(${i})`).style.display = "none";
			}
	}
}

function sleep(ms = 0) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

init();
