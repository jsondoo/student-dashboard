import React, { useState, useEffect } from 'react'
import Heatmap from './Heatmap'

function Discussion () {
  const [discussion, setDiscussion] = useState([])
  const [timestamps, setTimestamps] = useState([])

  // add useEffect here for discussion
  useEffect(() => {
    fetch('http://localhost:4001/getdiscussions')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setDiscussion(data)
    })
  }, [])

  useEffect(() => {
    if (discussion.length > 0) {
      const discussionTimestamps = discussion
        .map(discussion => discussion.timestamp)

      setTimestamps(discussionTimestamps)
    }
  }, [discussion])

  return (
    <Heatmap timestamps={timestamps} />
  )
}

export default Discussion
