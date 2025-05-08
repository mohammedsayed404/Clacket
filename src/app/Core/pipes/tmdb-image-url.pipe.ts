import { Pipe, PipeTransform } from '@angular/core';
import { API } from '../../API/API';


@Pipe({
  name: 'tmdbImageUrl'
})
export class TmdbImageUrlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'string') {
      const baseUrl = API.tmdbImageUrl;
      const size = args[0] || 'original'; // Default to 'original' if no size is provided
      // Check if the value is a valid image path
      if (!value.startsWith('/')) {
        return value; // Return the original value if it's not a valid image path
      }
      const imageUrl = `${baseUrl}${size}${value}`;
      return imageUrl;
    }
    return value;
  }

}
