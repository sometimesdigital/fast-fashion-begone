import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { type Tag, TagInput } from "emblor";
import { IconBrandDiscord, IconCup } from "@tabler/icons-react";
import { ClearAll } from "./components/ClearAll";
import { CopyButton } from "./components/CopyButton";
const stringsToTags = (strings: string[]) =>
  strings.map((text: string) => ({ id: uuid(), text }));

const tagsToStrings = (tags: Tag[]) => tags.map(({ text }) => text);

const tagsToLowercase = (tags: Tag[]) =>
  tags.map(({ id, text }) => ({ id, text: text.toLowerCase() }));

const defaultValues = {
  brands: [],
  exactMatching: false,
};

const FormSchema = z.object({
  brands: z.array(z.object({ id: z.string(), text: z.string() })),
  exactMatching: z.boolean(),
});

export const Popup = () => {
  const { t } = useTranslation();

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [tags, setTags] = useState<Tag[]>(defaultValues.brands);
  const ref = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  useEffect(() => {
    const getBrowserStorage = async () => {
      const { brands } = await browser?.storage.local.get("brands");
      const { exactMatching } =
        await browser?.storage.local.get("exactMatching");
      form.setValue("brands", stringsToTags(brands));
      form.setValue("exactMatching", exactMatching);
    };

    if (chrome?.storage) {
      chrome.storage?.local.get(defaultValues, (value) => {
        form.setValue("brands", stringsToTags(value.brands));
        form.setValue("exactMatching", value.exactMatching);
      });
    } else if (browser?.storage) {
      getBrowserStorage();
    }
  }, []);

  useEffect(() => {
    const callback = form.subscribe({
      formState: {
        values: true,
      },
      callback: async ({ values }) => {
        if (chrome?.storage) {
          chrome.storage?.local.set({
            brands: tagsToStrings(values.brands),
          });
          chrome.storage?.local.set({ exactMatching: values.exactMatching });
        } else if (browser?.storage) {
          browser.storage.local.set({
            brands: tagsToStrings(values.brands),
            exactMatching: values.exactMatching,
          });
        }
      },
    });

    return callback;
  }, [form.subscribe]);

  useEffect(() => {
    form.setValue("brands", tagsToLowercase(tags));
  }, [tags]);

  return (
    <Form {...form}>
      <form className="w-[400px] h-[500px] m-5 space-y-5 flex flex-col items-start overflow-auto">
        <FormField
          control={form.control}
          name="brands"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start w-full flex-1 h-full overflow-auto">
              <FormLabel className="text-left">
                {t("Brands to exclude")}
              </FormLabel>
              <p className="text-muted-foreground text-sm">{t("help.list")}</p>
              <FormControl className="w-full flex-1 flex-wrap h-full overflow-auto">
                <div className="tags-wrapper">
                  <TagInput
                    {...field}
                    activeTagIndex={activeTagIndex}
                    addOnPaste
                    addTagsOnBlur
                    inputProps={{ ref } as any}
                    placeholder={t("eg. Shein, Zara...")}
                    setActiveTagIndex={setActiveTagIndex}
                    setTags={setTags}
                    validateTag={(tag) => {
                      const isValid = !field.value
                        .map(({ text }) => text)
                        .includes(tag.toLowerCase());

                      if (!isValid && ref.current) {
                        ref.current.value = "";
                      }

                      return isValid;
                    }}
                    sortTags
                    styleClasses={{
                      inlineTagsContainer: "p-2 flex-1 h-full overflow-auto",
                      input: "focus:outline-hidden",
                      tag: {
                        body: "ps-3 rounded-md",
                      },
                      tagList: {
                        container: "p-2 flex-1 h-full overflow-auto",
                      },
                    }}
                    tags={field.value}
                  />
                </div>
              </FormControl>
              <div className="flex justify-end gap-3 w-full">
                <CopyButton
                  text={form
                    .getValues()
                    .brands?.map(({ text }) => text)
                    .join(", ")}
                />
                <ClearAll action={() => form.setValue("brands", [])} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exactMatching"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-start gap-3">
                  <Checkbox
                    {...field}
                    checked={field.value}
                    id={field.name}
                    name={field.name}
                    onCheckedChange={(value) => field.onChange(value)}
                    value={field.name}
                  />
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>
                      {t("Only exact matches")}
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      {t("help.exactMatching")}
                    </p>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-3 w-full">
          <Button
            className="flex-1"
            type="button"
            onClick={() => chrome?.tabs.reload() || browser?.tabs.reload()}
          >
            {t("Reload page")}
          </Button>
          <Button
            asChild
            variant="secondary"
            type="button"
            title={t("Discord")}
          >
            <a title={t("Discord")} href="https://discord.gg/PquukD7S">
              <IconBrandDiscord />
            </a>
          </Button>
          <Button asChild variant="secondary" type="button" title={t("Ko-fi")}>
            <a title={t("Ko-fi")} href="https://ko-fi.com/sometimesdigital">
              <IconCup />
            </a>
          </Button>
        </div>
      </form>
    </Form>
  );
};
