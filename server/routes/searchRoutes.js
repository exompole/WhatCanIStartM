const express = require('express');
const router = express.Router();
const searchService = require('../services/searchService');
const LemonProduct = require('../models/lemonProductModel');

// Full-text search with filters and pagination
router.get('/search', async (req, res) => {
  try {
    const {
      q: query,
      page = 1,
      limit = 20,
      sortBy = 'relevance',
      category,
      priceRange,
      rating,
      location,
      organic,
      seller
    } = req.query;

    const filters = {
      category,
      priceRange,
      rating,
      location,
      organic,
      seller
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    const results = await searchService.fullTextSearch(query, {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      filters
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

// Fuzzy search for typo tolerance
router.get('/fuzzy', async (req, res) => {
  try {
    const { q: query, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter is required'
      });
    }

    const results = await searchService.fuzzySearch(query, {
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Fuzzy search error:', error);
    res.status(500).json({
      success: false,
      message: 'Fuzzy search failed',
      error: error.message
    });
  }
});

// Autocomplete suggestions
router.get('/autocomplete', async (req, res) => {
  try {
    const { q: query, limit = 8, includeCategories = true } = req.query;

    if (!query) {
      return res.json({
        success: true,
        data: []
      });
    }

    const suggestions = await searchService.getAutocompleteSuggestions(query, {
      limit: parseInt(limit),
      includeCategories: includeCategories === 'true'
    });

    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Autocomplete error:', error);
    res.status(500).json({
      success: false,
      message: 'Autocomplete failed',
      error: error.message
    });
  }
});

// Faceted search
router.get('/facets', async (req, res) => {
  try {
    const { q: query, ...filters } = req.query;

    // Remove undefined filters
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    const facets = await searchService.getFacetedSearch(query, { filters });

    res.json({
      success: true,
      data: facets
    });
  } catch (error) {
    console.error('Faceted search error:', error);
    res.status(500).json({
      success: false,
      message: 'Faceted search failed',
      error: error.message
    });
  }
});

// Trending suggestions
router.get('/trending', async (req, res) => {
  try {
    const { location, limit = 5 } = req.query;

    const trending = await searchService.getTrendingSuggestions(location, {
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: trending
    });
  } catch (error) {
    console.error('Trending suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Trending suggestions failed',
      error: error.message
    });
  }
});

// Voice search (simulated)
router.post('/voice', async (req, res) => {
  try {
    const { audioData, language = 'en-US', ...options } = req.body;

    if (!audioData) {
      return res.status(400).json({
        success: false,
        message: 'Audio data is required'
      });
    }

    const results = await searchService.voiceSearch(audioData, {
      language,
      ...options
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Voice search error:', error);
    res.status(500).json({
      success: false,
      message: 'Voice search failed',
      error: error.message
    });
  }
});

// Search analytics
router.get('/analytics', async (req, res) => {
  try {
    const { days = 7, limit = 10 } = req.query;

    const analytics = await searchService.getSearchAnalytics({
      days: parseInt(days),
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Analytics retrieval failed',
      error: error.message
    });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await LemonProduct.distinct('category');
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Categories retrieval failed',
      error: error.message
    });
  }
});

// Get all locations
router.get('/locations', async (req, res) => {
  try {
    const locations = await LemonProduct.distinct('harvest_location');
    
    res.json({
      success: true,
      data: locations
    });
  } catch (error) {
    console.error('Locations error:', error);
    res.status(500).json({
      success: false,
      message: 'Locations retrieval failed',
      error: error.message
    });
  }
});

// Get all sellers
router.get('/sellers', async (req, res) => {
  try {
    const sellers = await LemonProduct.distinct('seller_name');
    
    res.json({
      success: true,
      data: sellers
    });
  } catch (error) {
    console.error('Sellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Sellers retrieval failed',
      error: error.message
    });
  }
});

// Get all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await LemonProduct.distinct('tags');
    
    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    console.error('Tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Tags retrieval failed',
      error: error.message
    });
  }
});

// Advanced search with multiple criteria
router.post('/advanced', async (req, res) => {
  try {
    const {
      query,
      filters = {},
      sortBy = 'relevance',
      page = 1,
      limit = 20
    } = req.body;

    const results = await searchService.fullTextSearch(query, {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      filters
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Advanced search error:', error);
    res.status(500).json({
      success: false,
      message: 'Advanced search failed',
      error: error.message
    });
  }
});

// Search suggestions based on popular queries
router.get('/suggestions', async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    // Get popular search queries from analytics
    const popularQueries = await searchService.getSearchAnalytics({
      days: 30,
      limit: parseInt(limit)
    });

    const suggestions = popularQueries.map(item => ({
      query: item._id,
      count: item.count
    }));

    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Suggestions retrieval failed',
      error: error.message
    });
  }
});

module.exports = router; 