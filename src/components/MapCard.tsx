import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface MapProduct {
  title: string;
  info: string;
  image: string;
  downloadLink: string;
}

interface MapCardProps {
  product: MapProduct;
}

export function MapCard({ product }: MapCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract badge text from title (text within parentheses)
  const badgeMatch = product.title.match(/^\(([^)]+)\)/);
  const badgeText = badgeMatch ? badgeMatch[1] : null;
  const displayTitle = badgeText
    ? product.title.replace(/^\([^)]+\)\s*/, '')
    : product.title;

  // Check if info has more than 5 lines
  const infoLines = product.info.split('\n');
  const hasMoreLines = infoLines.length > 5;
  const displayInfo = isExpanded ? product.info : infoLines.slice(0, 5).join('\n');

  const handleDownload = () => {
    try {
      const url = new URL(product.downloadLink);
      window.open(product.downloadLink, '_blank', 'noopener,noreferrer');
      toast.success('Opening download link...');
    } catch (error) {
      toast.error('Invalid download link. Please check the URL.');
    }
  };

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      {badgeText && (
        <Badge className="absolute top-4 right-4 z-10 bg-green-500 hover:bg-green-600">
          {badgeText}
        </Badge>
      )}
      
      <CardHeader className="p-0">
        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <ImageWithFallback
            src={product.image}
            alt={displayTitle}
            className="w-full h-full object-contain"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="mb-2 text-gray-900 dark:text-gray-100">{displayTitle}</h3>
        <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {displayInfo}
          {hasMoreLines && !isExpanded && '...'}
        </div>
        {hasMoreLines && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleDownload} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
