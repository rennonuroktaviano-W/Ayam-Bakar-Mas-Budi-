import { featuredMenu } from "@/data/menu";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FeaturedMenuRail,
  MenuCardSkeletonNote,
  ViewAllMenuLink,
} from "@/components/menu/MenuCard";

export function FeaturedMenu() {
  return (
    <section
      id="menu-favorit"
      className="bg-api-cream py-14 sm:py-16 lg:py-20"
      aria-labelledby="menu-favorit-title"
    >
      <SectionHeading
        eyebrow="Menu Favorit"
        title="Yang Paling Sering Dipesan"
        description="Empat racuan yang jadi langganan tetap sejak pertama buka. Semua bisa dipesan langsung lewat WhatsApp."
      />

      <Container>
        <FeaturedMenuRail items={featuredMenu} />

        <div className="reveal mt-8 flex flex-col items-center gap-3">
          <ViewAllMenuLink />
          <MenuCardSkeletonNote />
        </div>
      </Container>
    </section>
  );
}
