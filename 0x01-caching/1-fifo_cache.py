#!/usr/bin/env python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
    FIFOCache defines a FIFO caching system.

    Attributes:
        order (list): A list to keep track of the order in 
        which items were added to the cache.

    Methods:
        put(key, item): Cache a key-value pair.
        get(key): Return the value linked to a given key, or None.
    """

    def __init__(self):
        """
        Initialize the class with the parent's init method.
        """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """
        Cache a key-value pair.

        Args:
            key: The key to be cached.
            item: The value to be cached.
        """
        if key is None or item is None:
            return
        length = len(self.cache_data)
        if length >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
            print("DISCARD: {}".format(self.order[0]))
            del self.cache_data[self.order[0]]
            del self.order[0]
        self.order.append(key)
        self.cache_data[key] = item

    def get(self, key):
        """
        Return the value linked to a given key, or None.

        Args:
            key: The key to retrieve the value for.

        Returns:
            The value associated with the given key, or 
            None if the key is not found in the cache.
        """
        return self.cache_data.get(key, None)
