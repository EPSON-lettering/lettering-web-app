'use client';

import React, { PropsWithChildren } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient()


const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
	return (
			<QueryClientProvider client={queryClient}>
				{ children }
			</QueryClientProvider>
	);
};

export default QueryProvider;
