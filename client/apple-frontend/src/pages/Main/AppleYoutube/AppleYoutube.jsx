import React, { useState, useEffect } from "react";
import "./AppleYoutube.css";

function AppleYoutube() {
  const [YoutubeVideos, setYoutubeVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=6&key=AIzaSyBuliLlWyKRMlHCdmvjvkTF3P0lR-_j_cM&order=date`

        // `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCxA7AzkI2Sndf8S1G5rSkwQ&maxResults=9&key=AIzaSyBuliLlWyKRMlHCdmvjvkTF3P0lR-_j_cM&order=date`
      );
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      setYoutubeVideos(data.items);
    }
    getVideos();
  }, []);
  // console.log(YoutubeVideos);

  return (
    <section className="youtubeVideoWrapper">
      <div className="allVideosWrapper">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <div className="title-wraper video-title-wrapper">
                <h1 className="font-weight-bold">Latest Youtube Videos</h1>
              </div>
            </div>

            {YoutubeVideos.map((singleVideo, id) => {
              let vidId = singleVideo.id.videoId;
              let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
              let videoWrapper = (
                <div key={id} className="col-sm-12 col-md-6 col-lg-4">
                  <div className="singleVideoWrapper">
                    <div className="videoThumbnail">
                      <a href={vidLink} target="_blank" rel="noreferrer">
                        <img src={singleVideo.snippet.thumbnails.high.url} />
                      </a>
                    </div>

                    <div className="videoInfoWrapper">
                      <div className="videoTitle">
                        <a href={vidLink} target="_blank">
                          {singleVideo.snippet.title}
                        </a>
                      </div>

                      <div className="videoDesc">
                        {singleVideo.snippet.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
              return videoWrapper;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppleYoutube;
