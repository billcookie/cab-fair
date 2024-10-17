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
    title: "Splitting Fairly",
    description:
      "The default method for a reason! Splitting fairly takes into account the distance each person traveled, ensuring that everyone contributes based on their share of the ride. It’s a balanced approach that aims for fairness in every journey.",
  },
  {
    title: "Splitting Proportionately",
    description:
      "For those who want to dive deeper into the numbers, splitting proportionately considers each rider's distance relative to the total journey. This method provides a more granular approach, perfect for groups looking to ensure that everyone pays their fair share based on actual usage.",
  },
  {
    title: "Splitting Evenly",
    description:
      "When it comes to splitting the fare, sometimes the simplest method is best. With splitting evenly, everyone pays the same amount, making it a hassle-free choice for friends who want to keep things straightforward."
  },
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
                      After too many missed last trains and unfortunate taxi rides home, we're dedicated to helping the world* get home safe and split cab fares fairly.
                      (* by world, we mean Greater Tokyo Area)
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem title="Settle the Debate">
                The taxi fare debate has raged on for centuries (in the world of philosophy), but that doesn't mean it needs to rage on between friends.
              </ListItem>
              <ListItem title="Fair & Square">
                With four different ways to split the taxi ride, there's an option for every preference. While we have our own views, ultimately each friend group is different, so choose the method that best suits you (and your friends).
              </ListItem>
              <ListItem title="Save Money">
                See how much you save compared to taking a solo cab.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Methods</NavigationMenuTrigger>
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
          <p className=" text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
