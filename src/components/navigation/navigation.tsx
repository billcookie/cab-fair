import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; description: string }[] = [
  {
    title: "Taxi Fare Calculations",
    description:
      "We use Tokyo Hire-Taxi Association rates",
  },
  {
    title: "Group Fare Splitting",
    description:
      "Easily divide the total fare based on each rider's distance.",
  },
  {
    title: "Savings Comparison",
    description:
      "Compare individual fares with group fares to see how much you save."
  },
  {
    title: "User-Friendly Interface",
    description:
      "Intuitive design for hassle-free fare calculations and splits.",
  },
  {
    title: "Instant Fare Estimates",
    description:
      "Get quick estimates of your fare based on distance and time."
  }
]

export function Navigation() {
  return (
    <NavigationMenu className="text-white">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-black">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md text-white"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      About Cab Fair
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Cab Fair is a simple tool that splits taxi fares fairly based on each person's distance from the starting point.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem title="Easy Peasy">
                Never have the trouble of splitting cab fares again.
              </ListItem>
              <ListItem title="Fair for Everyone">
                Automatically calculates each rider's share based on their distance.
              </ListItem>
              <ListItem title="Save Money">
                See how much you save compared to taking a solo cab.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>How We Do</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className=" gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="https://www.taxi-tokyo.or.jp/english/call/pricelist.html">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Tokyo Rates
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
