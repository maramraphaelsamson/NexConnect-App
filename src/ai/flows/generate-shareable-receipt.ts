'use server';

/**
 * @fileOverview Generates a visually appealing receipt image for a recent transaction that can be easily shared with customers via WhatsApp.
 *
 * - generateShareableReceipt - A function that generates the receipt image.
 * - GenerateShareableReceiptInput - The input type for the generateShareableReceipt function.
 * - GenerateShareableReceiptOutput - The return type for the generateShareableReceipt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShareableReceiptInputSchema = z.object({
  transactionDetails: z
    .string()
    .describe('Details of the transaction, including items purchased, prices, and total amount.'),
  businessName: z.string().describe('The name of the business.'),
  customerName: z.string().describe('The name of the customer.'),
  date: z.string().describe('The date of the transaction.'),
  backgroundImage: z
    .string()
    .describe(
      'Optional background image for the receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // keep
    ),
});
export type GenerateShareableReceiptInput = z.infer<typeof GenerateShareableReceiptInputSchema>;

const GenerateShareableReceiptOutputSchema = z.object({
  receiptImageUrl: z
    .string()
    .describe(
      'The URL of the generated receipt image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type GenerateShareableReceiptOutput = z.infer<typeof GenerateShareableReceiptOutputSchema>;

export async function generateShareableReceipt(
  input: GenerateShareableReceiptInput
): Promise<GenerateShareableReceiptOutput> {
  return generateShareableReceiptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShareableReceiptPrompt',
  input: {schema: GenerateShareableReceiptInputSchema},
  output: {schema: GenerateShareableReceiptOutputSchema},
  prompt: `You are an AI assistant specialized in generating visually appealing receipt images for businesses to share with their customers.

  Create a receipt image with the following details:
  Business Name: {{{businessName}}}
  Customer Name: {{{customerName}}}
  Date: {{{date}}}
  Transaction Details: {{{transactionDetails}}}

  The receipt should be modern, clean, and suitable for sharing via WhatsApp. Use a clear and readable font. If a background image is provided, incorporate it tastefully.  Otherwise use a generic, pleasant background.

  Return the image as a data URI.  Do not include any other text.

  {{#if backgroundImage}}
  Use the following background image: {{media url=backgroundImage}}
  {{/if}}`,
});

const generateShareableReceiptFlow = ai.defineFlow(
  {
    name: 'generateShareableReceiptFlow',
    inputSchema: GenerateShareableReceiptInputSchema,
    outputSchema: GenerateShareableReceiptOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: await prompt(input),
      model: 'googleai/imagen-4.0-fast-generate-001',
    });
    return {receiptImageUrl: media.url!};
  }
);
