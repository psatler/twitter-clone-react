import React, { Component } from "react";

class NewTweet extends Component {
  state = {
    text: ""
  };

  handleChange = e => {
    const text = e.target.value;

    this.setState(() => ({
      text
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text } = this.state;

    //todo: Add tweet to store
    console.log("New Tweet: ", text);

    //reset state to default
    this.setState(() => ({
      text: ""
    }));
  };

  render() {
    const { text } = this.state;
    const tweetLeft = 280 - text.length;

    // redirect to home view if submitted

    return (
      <div>
        <h3 className="center">Compose new Tweet </h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happenning"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {/* show how many characters are left */}
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}

          {/* button is disabled if it's an empty string */}
          <button className="btn" type="submit" disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewTweet;
