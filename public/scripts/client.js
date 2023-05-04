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
        <!-- <p>${content.text}</p> -->
        ${$("<p>")
          .text(content.text)
          .html()}
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

// display errors
const displayError = err_msg => {
  $("form")
    .find(".error_msg")
    .text(err_msg)
    .show()
    .slideDown("slow");
};

$(document).ready(function () {

  $("form").on("submit", function (e) {
    e.preventDefault();

    // if content is more than 14 characters
    if (
      $(this)
        .find("textarea")
        .val().length > defaultCharsLeft
    ) {
      const error_msg = "You cannot exceed more than 140 characters";
      return displayError(error_msg);
    }
    // if content is empty
    if (
      $(this)
        .find("textarea")
        .val().length < 1
    ) {
      const error_msg = "You cannot post an empty tweet.";
      return displayError(error_msg);
    }

    $.ajax({
      method: "POST",
      url: endpoint,
      type: "application/json",
      data: $(this).serialize(),
      success: function () {
        $("textarea").val("");
        $(".counter").text(140)
        $.get("http://localhost:8080/tweets", data => {
          const newTweet = data.slice(-1);
          renderTweets(newTweet);
        });
      },
    });
  });

  loadTweets();
});
