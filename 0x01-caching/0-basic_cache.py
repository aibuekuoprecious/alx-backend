#!/usr/bin/env python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    Defines a class for caching information in key-value pairs

    Methods:
        put(key, item) - store a key-value pair
        get(key) - retrieve the value associated with a key
    """

    def put(self, key, item):
        """
        Store a key-value pair

        Args:
            key: The key to store the value under
            item: The value to be stored
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        Retrieve the value associated with a key

        Args:
            key: The key to retrieve the value for

        Returns:
            The value associated with the key, or 
            None if the key is None or doesn't exist
        """
        return self.cache_data.get(key, None)
