import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useTranslation } from "react-i18next"



interface NavigationProps {
  handleChangeLanguage: () => void
  currentLanguage: string
}

export const Navigation: React.FC<NavigationProps> = ({
  handleChangeLanguage, currentLanguage }) => {
  const { t } = useTranslation()
  const components: { title: string; description: string }[] = [
    {
      title: `${t("splittingFairlyTitle")}`,
      description:
        `${t("splittingFairlyDescription")}`,
    },
    {
      title: `${t("splittingProportionatelyTitle")}`,
      description:
        `${t("splittingProportionatelyDescription")}`,
    },
    {
      title: `${t("splittingEvenlyTitle")}`,
      description:
        `${t("splittingEvenlyDescription")}`
    },
  ]
  return (
    <NavigationMenu className="text-white">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('aboutUs')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-black">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md text-white"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {t('aboutUsTitle')}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {t('aboutUsDescription')}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem title={`${t('settleTheDebateTitle')}`}>
                {t('settleTheDebateDescription')}
              </ListItem>
              <ListItem title={`${t('fairAndSquareTitle')}`}>
                {t('fairAndSquareDescription')}
              </ListItem>
              <ListItem title={`${t('saveMoneyTitle')}`}>
                {t('saveMoneyDescription')}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("methods")}</NavigationMenuTrigger>
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
        {/* <NavigationMenuItem>
          <a href="https://www.taxi-tokyo.or.jp/english/call/pricelist.html">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Tokyo Rates
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem> */}
        <Select onValueChange={handleChangeLanguage} value={currentLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="English" />
          </SelectTrigger>
          <SelectContent className='bg-black text-white'>
            <SelectItem value="en">{t("languageSelectionEnglish")}</SelectItem>
            <SelectItem value="jp">{t("languageSelectionJapanese")}</SelectItem>
          </SelectContent>
        </Select>
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
