'use client'

import { useState } from 'react'

export default function Home() {
  const [botToken, setBotToken] = useState('')
  const [channelId, setChannelId] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!botToken || !channelId || !message) {
      setStatus({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setLoading(true)
    setStatus({ type: 'info', text: 'Sending message...' })

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: botToken,
          channelId,
          message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', text: 'Message sent successfully!' })
        setMessage('')
      } else {
        setStatus({ type: 'error', text: data.error || 'Failed to send message' })
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🤖 Discord Bot Dashboard</h1>
        <p>Manage and interact with your Discord bot</p>
      </div>

      <div className="card">
        <h2>Send Message</h2>
        {status && (
          <div className={`status ${status.type}`}>
            {status.text}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="token">Bot Token</label>
          <input
            id="token"
            type="password"
            placeholder="Your Discord bot token"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="channel">Channel ID</label>
          <input
            id="channel"
            type="text"
            placeholder="Discord channel ID"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          className="btn"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      <div className="card">
        <h2>Available Commands</h2>
        <ul className="commands-list">
          <li className="command-item">
            <strong>/ping</strong>
            <p>Check if the bot is responsive</p>
          </li>
          <li className="command-item">
            <strong>/hello</strong>
            <p>Get a friendly greeting from the bot</p>
          </li>
          <li className="command-item">
            <strong>/help</strong>
            <p>Display all available commands</p>
          </li>
          <li className="command-item">
            <strong>/serverinfo</strong>
            <p>Get information about the Discord server</p>
          </li>
        </ul>
      </div>

      <div className="card">
        <h2>Features</h2>
        <div className="grid">
          <div className="feature-card">
            <h3>💬 Message Sending</h3>
            <p>Send messages to any Discord channel using the bot</p>
          </div>
          <div className="feature-card">
            <h3>🔧 Easy Setup</h3>
            <p>Simple configuration with just your bot token and channel ID</p>
          </div>
          <div className="feature-card">
            <h3>🚀 Fast & Reliable</h3>
            <p>Built with Next.js for optimal performance</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Setup Instructions</h2>
        <ol style={{ lineHeight: '2', color: '#555' }}>
          <li>Go to <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea' }}>Discord Developer Portal</a></li>
          <li>Create a new application or select an existing one</li>
          <li>Go to the "Bot" section and copy your bot token</li>
          <li>Enable necessary intents (Message Content Intent, Server Members Intent)</li>
          <li>Invite your bot to a server using OAuth2 URL Generator</li>
          <li>Get the channel ID by right-clicking a channel (enable Developer Mode in Discord settings)</li>
          <li>Paste your token and channel ID above to start using the bot!</li>
        </ol>
      </div>
    </div>
  )
}
