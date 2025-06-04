import { memo, useMemo, useState, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { useWindowSize } from '@/hooks/useWindowSize';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  artisan: string;
  origin: string;
}

interface VirtualizedProductGridProps {
  products: Product[];
  itemsPerPage?: number;
}

interface GridItemProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: {
    products: Product[];
    itemsPerRow: number;
  };
}

const GridItem = memo(({ columnIndex, rowIndex, style, data }: GridItemProps) => {
  const { products, itemsPerRow } = data;
  const index = rowIndex * itemsPerRow + columnIndex;
  const product = products[index];

  if (!product) {
    return <div style={style} />;
  }

  return (
    <div style={style} className="p-2">
      <ProductCard product={product} />
    </div>
  );
});

GridItem.displayName = 'GridItem';

const VirtualizedProductGrid = memo(({ 
  products, 
  itemsPerPage = 50 
}: VirtualizedProductGridProps) => {
  const { width, height } = useWindowSize();
  const [containerHeight, setContainerHeight] = useState(600);

  // Calculate grid dimensions based on screen size
  const gridConfig = useMemo(() => {
    const minItemWidth = 280; // Minimum width for ProductCard
    const gap = 16; // Gap between items
    const padding = 32; // Container padding
    
    const availableWidth = (width || 1200) - padding;
    const itemsPerRow = Math.max(1, Math.floor(availableWidth / (minItemWidth + gap)));
    const itemWidth = (availableWidth - (gap * (itemsPerRow - 1))) / itemsPerRow;
    const itemHeight = 400; // Fixed height for ProductCard
    
    const totalRows = Math.ceil(products.length / itemsPerRow);
    const gridHeight = Math.min(containerHeight, totalRows * itemHeight);
    
    return {
      itemsPerRow,
      itemWidth,
      itemHeight,
      gridHeight,
      totalRows
    };
  }, [width, products.length, containerHeight]);

  // Update container height based on viewport
  useEffect(() => {
    const updateHeight = () => {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      setContainerHeight(Math.min(vh - 300, 800)); // Reserve space for header/footer
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Don't virtualize if there are few products
  if (products.length <= 12) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  const itemData = {
    products,
    itemsPerRow: gridConfig.itemsPerRow,
  };

  return (
    <div className="w-full px-4">
      <Grid
        columnCount={gridConfig.itemsPerRow}
        rowCount={gridConfig.totalRows}
        columnWidth={gridConfig.itemWidth}
        rowHeight={gridConfig.itemHeight}
        height={gridConfig.gridHeight}
        width={width || 1200}
        itemData={itemData}
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {GridItem}
      </Grid>
    </div>
  );
});

VirtualizedProductGrid.displayName = 'VirtualizedProductGrid';

export default VirtualizedProductGrid;
