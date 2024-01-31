#!/usr/bin/env python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
    MRUCache defines a Most Recently Used (MRU) caching system.

    Methods:
    - put(key, item): Cache a key-value pair.
    - get(key): Return the value linked to a given key, or None.
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
        - key: The key to be cached.
        - item: The value to be cached.
        """
        if key is None or item is None:
            return
        cache_size = len(self.cache_data)
        if cache_size >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
            discarded_key = self.usage[-1]
            print("DISCARD: {}".format(discarded_key))
            del self.cache_data[discarded_key]
            self.usage.pop()
        if key in self.usage:
            self.usage.remove(key)
        self.usage.append(key)
        self.cache_data[key] = item

    def get(self, key):
        """
        Return the value linked to a given key, or None.

        Args:
        - key: The key to retrieve the value for.

        Returns:
        - The value associated with the key, or 
        None if the key is not found.
        """
        if key is not None and key in self.cache_data:
            self.usage.remove(key)
            self.usage.append(key)
            return self.cache_data[key]
        return None
