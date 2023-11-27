// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

const element = document.getElementById("container");
const channelsEl = document.getElementById("channels");

async function getChannel() {
  try {
    const response = await fetch(
      "https://api.sr.se/api/v2/channels/?format=json"
    );
    const data = await response.json();
    console.log(data);

    data.channels.forEach((channel) => {
      const divEl = document.createElement("div");
      divEl.setAttribute("class", "myDiv");

      if (channel.color) {
        divEl.style.backgroundColor = `#${channel.color}`;
      }

      channelsEl.appendChild(divEl);

      const imgEl = document.createElement("img");
      imgEl.setAttribute("src", channel.image);
      imgEl.setAttribute("alt", channel.name + " logo");
      divEl.appendChild(imgEl);

      const h2El = document.createElement("h2");
      h2El.innerHTML = channel.name;
      divEl.appendChild(h2El);

      const audioEl = document.createElement("audio");
      audioEl.controls = true;
      const sourceEl = document.createElement("source");
      sourceEl.setAttribute("src", channel.liveaudio.url);
      sourceEl.setAttribute("type", "audio/mpeg");
      audioEl.appendChild(sourceEl);
      divEl.appendChild(audioEl);
    });
  } catch (error) {
    console.error("Error fetching channel data:", error);
  }
}

getChannel();
