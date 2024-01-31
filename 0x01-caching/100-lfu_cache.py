#!/usr/bin/env python3
""" BaseCaching module
"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """
    LFUCache defines a Least Frequently Used (LFU) caching system.
    It inherits from the BaseCaching class.
    """

    def __init__(self):
        """
        Initialize the LFUCache class by calling the parent's init method.
        It also initializes the usage list and frequency dictionary.
        """
        super().__init__()
        self.usage = []
        self.frequency = {}

    def put(self, key, item):
        """
        Cache a key-value pair in the LFUCache.
        If the cache is full, it removes the least frequently used item(s) 
        before adding the new item.
        """
        if key is None or item is None:
            pass
        else:
            length = len(self.cache_data)
            if length >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
                lfu_keys = [
                    k
                    for k, v in self.frequency.items()
                    if v == min(self.frequency.values())
                ]
                if len(lfu_keys) > 1:
                    lru_lfu = {k: self.usage.index(k) for k in lfu_keys}
                    discard = self.usage[min(lru_lfu.values())]
                else:
                    discard = lfu_keys[0]

                print("DISCARD: {}".format(discard))
                del self.cache_data[discard]
                self.usage.remove(discard)
                del self.frequency[discard]
            # update usage frequency
            self.frequency[key] = self.frequency.get(key, 0) + 1
            if key in self.usage:
                self.usage.remove(key)
            self.usage.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """
        Return the value linked to a given key in the LFUCache, or 
        None if the key is not found.
        It also updates the usage and frequency of the accessed key.
        """
        if key is not None and key in self.cache_data:
            self.usage.remove(key)
            self.usage.append(key)
            self.frequency[key] += 1
            return self.cache_data[key]
        return None
