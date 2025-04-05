import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const PropertyImageOverview = ({ images }: { images: string[] }) => {
  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Images overview</h2>
          <p className="text-muted-foreground mt-2">
            Click on an image to view full size.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-3 lg:gap-x-8">
            {images.map((imageUrl: string, index: number) => (
              <div
                key={index}
                className="flex aspect-[16/10] items-center justify-center relative bg-muted"
              >
                <Image
                  src={imageUrl}
                  alt={`Image ${index + 1} of ${images.length}`}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority={index === 0}
                  onError={(e) => (e.currentTarget.style.display = "none")} // Hide broken images
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyImageOverview;
