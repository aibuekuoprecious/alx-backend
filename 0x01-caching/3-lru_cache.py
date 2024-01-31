#!/usr/bin/env python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """
    LRUCache defines a Least Recently Used (LRU) caching system.

    Inherits from BaseCaching class.
    """

    def __init__(self):
        """
        Initialize the class with the parent's init method.
        """
        super().__init__()
        self.usage = []

    def put(self, key, item):
        """
        Cache a key-value pair.

        Args:
            key: The key to cache.
            item: The value to cache.
        """
        if key is None or item is None:
            return
        cache_size = len(self.cache_data)
        if cache_size >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
            print("DISCARD: {}".format(self.usage[0]))
            del self.cache_data[self.usage[0]]
            del self.usage[0]
        if key in self.usage:
            self.usage.remove(key)
        self.usage.append(key)
        self.cache_data[key] = item

    def get(self, key):
        """
        Return the value linked to a given key, or None.

        Args:
            key: The key to retrieve the value for.

        Returns:
            The value associated with the key, or 
            None if the key is not found.
        """
        if key is not None and key in self.cache_data:
            self.usage.remove(key)
            self.usage.append(key)
            return self.cache_data[key]
        return None
