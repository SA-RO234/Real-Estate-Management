import SectionTitle from "@/components/shared/SectionTitle";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { featuredCategories } from "@/lib/constants/featuredCategoryData";
import Link from "next/link";

const FeaturedCategories = () => {
  return (
    <section className="w-full py-8 ">
      <SectionTitle
        title="Featured Categories"
        subTitle="Explore our featured categories"
      />

      <ScrollArea className="w-full ">
        <div className="flex justify-center space-x-4 pb-4 ">
          {featuredCategories.map((feature) => (
            <Link
              key={feature.title}
              href={`/category/${feature.title.toLowerCase()}`}
              className="shrink-0 w-[250px]"
            >
              <figure>
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={feature.image || ""}
                    alt={`${feature.title}`}
                    className="aspect-[3/4] h-fit w-full object-cover"
                    width={400}
                    height={400}
                  />
                </div>
                <figcaption className="pt-2 text-xs text-muted-foreground flex flex-col">
                  <h3 className="font-semibold text-lg text-foreground">
                    {feature.title}
                  </h3>
                  <span className="text-foreground">
                    {feature.quantity} Properties
                  </span>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default FeaturedCategories;
