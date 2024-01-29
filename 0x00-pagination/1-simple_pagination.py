#!/usr/bin/env python3
"""
This module defines a Server class that paginates a database of popular baby names.
"""

import csv
from typing import List, Tuple


def calculate_index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculates the start and end index for pagination.
    Args:
        page (int): page number to return (pages are 1-indexed)
        page_size (int): number of items per page
    Return:
        tuple(start_index, end_index)
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index


class Server:
    """
    Server class to paginate a database of popular baby names.
    """

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Returns the cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Returns the requested page from the dataset
        Args:
            page (int): required page number. must be a positive integer
            page_size (int): number of records per page. must be a positive integer
        Return:
            list of lists containing required data from the dataset
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        dataset = self.dataset()
        data_length = len(dataset)
        start_index, end_index = calculate_index_range(page, page_size)
        return dataset[start_index:end_index]
