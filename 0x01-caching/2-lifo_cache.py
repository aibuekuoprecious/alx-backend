#!/usr/bin/env python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    LIFOCache defines a LIFO caching system

    Attributes:
        order (list): A list to keep track of the order of keys in the cache

    Methods:
        __init__(): Initializes the LIFOCache class
        put(key, item): Caches a key-value pair
        get(key): Returns the value linked to a given key, or None
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

        Args:
            key: The key to be cached
            item: The value to be cached
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

        Args:
            key: The key to retrieve the value for

        Returns:
            The value linked to the given key, or 
            None if the key is not found in the cache
        """
        return self.cache_data.get(key)
