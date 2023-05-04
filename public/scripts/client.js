/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let endpoint = "/tweets";

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

// render tweets
const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    let $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  });
};

// create a new tweet component
const createTweetElement = (tweetData) => {
  const { user, content, created_at } = tweetData;

  let singleTweetElement = $(`<article class="tweet-component">
        <!-- image-username-refkey -->
        <div class="image-username-refkey">
          <div class="image-username">
            <img src=${user.avatars} alt="" />
            <span>${user.name}</span>
          </div>
          <div>${user.handle}</div>
        </div>
        <!-- tweet contect -->
        <div class="tweet-content">
        <p>${content.text}</p>
        </div>
        <!-- time and reactions icons -->
        <div class="time-reactions">
        <p>${timeago.format(created_at)}</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </article>`);

  return singleTweetElement;
};

// loading the tweets
const loadTweets = () => {
  $.ajax({
    method: "GET",
    url: endpoint,
    dataType: "json",
    success: function (data) {
      renderTweets(data);
    },
  });
};

$(document).ready(function () {

  $("form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      method: "POST",
      url: endpoint,
      type: "application/json",
      data: $(this).serialize(),
      success: function () {
        $("textarea").val("");
        $.get("http://localhost:8080/tweets", (data) => {
          const newTweet = [data.slice(-1).pop()];
          renderTweets(newTweet);
        });
      },
    });
  });

  loadTweets();
});
