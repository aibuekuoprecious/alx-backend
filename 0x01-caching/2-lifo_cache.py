#!/usr/bin/env python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    LIFOCache defines a LIFO caching system
    """

    def __init__(self):
        """
        Initialize the class with the parent's init method
        """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """
        Cache a key-value pair
        """
        if key is None or item is None:
            return
        cache_size = len(self.cache_data)
        if cache_size >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
            discarded_key = self.order.pop()
            print("DISCARD: {}".format(discarded_key))
            del self.cache_data[discarded_key]
        if key in self.order:
            self.order.remove(key)
        self.order.append(key)
        self.cache_data[key] = item

    def get(self, key):
        """
        Return the value linked to a given key, or None
        """
        return self.cache_data.get(key)
