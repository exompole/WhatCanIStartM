const mongoose = require("mongoose");

const searchAnalyticsSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    index: true
  },
  resultCount: {
    type: Number,
    required: true
  },
  filters: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  userAgent: {
    type: String
  },
  sessionId: {
    type: String,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  searchType: {
    type: String,
    enum: ['text', 'voice', 'autocomplete', 'filter'],
    default: 'text'
  },
  clickPosition: {
    type: Number
  },
  conversion: {
    type: Boolean,
    default: false
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  location: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for better query performance
searchAnalyticsSchema.index({ query: 1, timestamp: -1 });
searchAnalyticsSchema.index({ sessionId: 1, timestamp: -1 });
searchAnalyticsSchema.index({ userId: 1, timestamp: -1 });

const SearchAnalytics = mongoose.model("SearchAnalytics", searchAnalyticsSchema);
module.exports = SearchAnalytics; 