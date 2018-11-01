### Tweet-like app

## Store architecture

The architecture of the redux store is as follows:

```js
{
  tweets: {
    tweetId: { tweetId, authorId, timestamp, text, likes, replies, replyingTo},
    tweetId: { tweetId, authorId, timestamp, text, likes, replies, replyingTo}
  },
  users: {
    userId: {userId, userName, avatar, tweets array},
    userId: {userId, userName, avatar, tweets array}
  },
  authedUser: userId
}
```
