import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import { ToastMsg } from '@/constants';
import { useFilterCategory } from '@/features/post';
import { toast } from '@/hooks';

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: '한 개 이상의 카테고리를 선택해주세요.',
  }),
});

export function FilterForm() {
  const { categories, checked, saveSettings } = useFilterCategory();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: checked,
    },
  });

  useEffect(() => {
    form.reset({ items: checked });
  }, [checked, form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    saveSettings(data.items);
    toast({
      title: ToastMsg.filterSuccess,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="mb-2 font-mono text-base font-semibold text-green">
                  Filter Categories
                </FormLabel>
                <FormDescription className="text-neutral-200">
                  선택한 카테고리의 콘텐츠만 랜덤으로 보여줘요!
                </FormDescription>
              </div>
              {categories.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-yellow">
                          {item.label.toUpperCase()}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="items-end border-none bg-green hover:bg-green/90" type="submit">
          저장
        </Button>
      </form>
    </Form>
  );
}
