#!/usr/bin/env python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
    MRUCache defines a Most Recently Used (MRU) caching system
    """

    def __init__(self):
        """
        Initialize the class with the parent's init method
        """
        super().__init__()
        self.usage = []

    def put(self, key, item):
        """
        Cache a key-value pair
        """
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
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
        Return the value linked to a given key, or None
        """
        if key is not None and key in self.cache_data:
            self.usage.remove(key)
            self.usage.append(key)
            return self.cache_data[key]
        return None