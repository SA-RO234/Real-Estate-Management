import { Home, Award, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <section className="lg:py-32 py-16 container mx-auto px-4">
      <div className="container flex flex-col gap-28">
        <div className="flex flex-col gap-7">
          <h1 className="text-4xl font-semibold lg:text-7xl">
            Finding your perfect home has never been easier
          </h1>
          <p className="max-w-xl text-lg">
            Premier Estates helps you discover your dream property with
            personalized service and local expertise. We make real estate
            simple, transparent, and rewarding.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 grid-cols-1  ">
          <img
            src="https://www.coloradorepros.com/uploads/3/1/2/2/31225003/new-home-in-fort-collins-colorado_orig.jpg"
            alt="Beautiful home exterior"
            className="size-full  h-[400px]  rounded-2xl object-cover"
          />
          <div className="relative w-full  h-[400px] ">
            <img
              src="https://costar.brightspotcdn.com/dims4/default/1e81fc0/2147483647/strip/true/crop/2100x1399+0+0/resize/2100x1399!/quality/100/?url=http%3A%2F%2Fcostar-brightspot.s3.us-east-1.amazonaws.com%2F83%2Faf%2F580fb5034f1593d7fdd6e2b0855b%2F100.jpeg"
              alt="Beautiful home exterior"
              className="w-full h-full rounded-2xl object-cover"
            />
            <div className="absolute top-0 z-10 left-0 w-full h-full flex flex-col justify-between bg-foreground/20 gap-10 rounded-2xl p-10">
              <p className="text-sm text-muted">OUR MISSION</p>
              <p className="md:text-lg font-medium text-muted">
                We believe that finding the perfect home should be a joyful
                experience. Our mission is to guide every client through the
                real estate journey with expertise, integrity, and personalized
                attention to their unique needs.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              We make real estate transactions seamless and stress-free
            </h2>
            <p className="text-muted-foreground">
              With over 20 years of experience in the local market, we've helped
              thousands of families find their perfect homes. Here's what sets
              us apart.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Home className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Local Market Expertise
              </h3>
              <p className="text-muted-foreground">
                Our agents have deep knowledge of neighborhood trends, property
                values, and hidden gems in the community. We provide insights
                that help you make informed decisions.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Award className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Client-First Approach
              </h3>
              <p className="text-muted-foreground">
                We listen carefully to your needs and preferences, then work
                tirelessly to find properties that match your lifestyle and
                budget. Your satisfaction is our top priority.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Users className="size-5" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">
                Full-Service Support
              </h3>
              <p className="text-muted-foreground">
                From initial search to closing day, we handle all the details.
                Our network of trusted partners in financing, inspection, and
                legal services ensures a smooth transaction.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-10 text-sm font-medium text-muted-foreground">
              MEET OUR AGENTS
            </p>
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              We're passionate about helping you find home
            </h2>
          </div>
          <div>
            <img
              src="https://img.freepik.com/premium-photo/real-estate-agent-discussing-property-value-with_995162-4283.jpg"
              alt="Our real estate team"
              className="mb-6 max-h-96 w-full rounded-xl object-cover"
            />
            <p className="text-muted-foreground">
              Our team of experienced agents combines market knowledge with
              personalized service to make your real estate journey exceptional.
              Whether you're buying your first home or investing in property,
              we're here to guide you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
