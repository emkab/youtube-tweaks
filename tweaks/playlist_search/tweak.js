const s_video_list = "#contents.ytd-playlist-video-list-renderer";
const s_video = "#contents > ytd-playlist-video-renderer:nth-child";
const s_title_postfix = " #video-title";
const s_channel_postfix = " #channel-name #text > a";
const a_video_titles = [];
const a_video_channels = [];
const e_playlist_search_input_label = document.createElement("label", {
	for: "ek_yt_tweaks_playlist_search_input",
});

async function init() {
	e_playlist_search_input_label.textContent = "Search Playlist:";
	const e_playlist_search_input = document.createElement("input", {
		type: "search",
		name: "ek_yt_tweaks_playlist_search_input",
		id: "ek_yt_tweaks_playlist_search_input",
	});

	await sleep(500);

	const e_video_list = document.querySelector(s_video_list);
	console.log("EMKAB PLAYLIST SEARCH UP");
	if (e_video_list) {
		// console.log("EK YT TWEAKS: FOUND e_video_list");
		e_playlist_search_input.addEventListener("input", searchInputChange);
		e_video_list.parentNode.insertBefore(e_playlist_search_input, e_video_list);
		e_playlist_search_input.parentNode.insertBefore(
			e_playlist_search_input_label,
			e_playlist_search_input
		);

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
