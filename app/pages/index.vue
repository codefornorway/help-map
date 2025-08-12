<script setup lang="ts">
const isListOpen = ref(false);
const isMenuOpen = ref(false);
const menuView = ref<'menu' | 'feedback' | 'contact' | 'edit' | 'add' | 'volunteer' | 'donor'>('menu');

function toggleList() {
  isListOpen.value = !isListOpen.value;
}

function openMenu() {
  isMenuOpen.value = true;
  menuView.value = 'menu';
}

function closeMenu() {
  isMenuOpen.value = false;
}

function showView(view: typeof menuView.value) {
  menuView.value = view;
}

function goBack() {
  menuView.value = 'menu';
}
</script>

<template>
  <div class="h-screen flex relative">
    <!-- Toggle button for mobile -->
    <button
      @click="toggleList"
      class="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-md lg:hidden"
      :aria-expanded="isListOpen"
      aria-controls="location-panel">
      {{ isListOpen ? 'Close' : 'Locations' }}
    </button>

    <!-- Overlay for mobile when panels are open -->
    <div
      v-if="isListOpen || isMenuOpen"
      class="fixed inset-0 bg-black/40 z-10 lg:hidden"
      @click="
        () => {
          if (isMenuOpen) closeMenu();
          if (isListOpen) toggleList();
        }
      " />

    <!-- Location list panel -->
    <aside
      id="location-panel"
      :class="[
        'fixed inset-y-0 left-0 w-64 max-w-xs bg-white z-20 shadow-2xl overflow-y-auto transform transition-transform duration-300',
        isListOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:relative lg:translate-x-0 lg:w-1/5',
      ]">
      <LocationList />
    </aside>

    <!-- Map area -->
    <div class="flex-1 h-full relative">
      <MapView @open-menu="openMenu" />
    </div>

    <!-- Menu sidebar -->
    <!-- Overlay -->
    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isMenuOpen" class="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" @click="isMenuOpen = false"></div>
    </transition>

    <!-- Drawer (w-64 sabit) -->
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawerTitle"
      :class="[
        'fixed inset-y-0 right-0 w-96 max-w-96 bg-white z-50 shadow-xl overflow-y-auto transition-transform duration-300 flex flex-col rounded-l-xl',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full',
      ]">
      <!-- Header -->
      <div class="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center gap-2">
            <button v-if="menuView !== 'menu'" class="p-2 rounded-md hover:bg-gray-100 focus:outline-none" aria-label="Back" @click="goBack">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <h2 id="drawerTitle" class="text-base font-semibold">
              {{
                menuView === 'menu'
                  ? 'Menu'
                  : menuView === 'feedback'
                  ? 'Feedback'
                  : menuView === 'contact'
                  ? 'Contact'
                  : menuView === 'edit'
                  ? 'Edit Address'
                  : menuView === 'add'
                  ? 'Add Address'
                  : menuView === 'donor'
                  ? 'Become a Sponsor'
                  : 'GitHub'
              }}
            </h2>
          </div>

          <button class="p-2 rounded-md hover:bg-gray-100 focus:outline-none" aria-label="Close panel" @click="closeMenu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="px-4 py-4 space-y-5">
        <!-- MENU -->
        <div v-if="menuView === 'menu'" class="grid gap-2">
          <button class="w-full text-left flex items-start gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50" @click="showView('feedback')">
            <span class="mt-0.5 p-1.5 rounded border">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4a2 2 0 0 0-2 2v15.586A1 1 0 0 0 3.707 20L7 16h13a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
              </svg>
            </span>
            <div>
              <div class="font-medium">Feedback</div>
              <div class="text-xs text-gray-600">Report a bug, suggest an improvement, or fix data.</div>
            </div>
          </button>

          <button class="w-full text-left flex items-start gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50" @click="showView('contact')">
            <span class="mt-0.5 p-1.5 rounded border">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4v16h16V4ZM6 8h12v2H6V8Zm0 4h12v2H6v-2Z" /></svg>
            </span>
            <div>
              <div class="font-medium">Contact</div>
              <div class="text-xs text-gray-600">Get in touch quickly.</div>
            </div>
          </button>

          <button class="w-full text-left flex items-start gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50" @click="showView('edit')">
            <span class="mt-0.5 p-1.5 rounded border">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 17.17V20h2.83L18.06 8.77l-2.83-2.83L4 17.17Z" /></svg>
            </span>
            <div>
              <div class="font-medium">Edit Address</div>
              <div class="text-xs text-gray-600">Update an existing location.</div>
            </div>
          </button>

          <button class="w-full text-left flex items-start gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50" @click="showView('add')">
            <span class="mt-0.5 p-1.5 rounded border">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z" /></svg>
            </span>
            <div>
              <div class="font-medium">Add Address</div>
              <div class="text-xs text-gray-600">Suggest a new location.</div>
            </div>
          </button>

          <a
            class="w-full text-left flex items-start gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50"
            href="https://github.com/codefornorway/help-map"
            target="_blank"
            rel="noopener">
            <span class="mt-0.5 p-1.5 rounded border">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 .5C5.73.5.98 5.23.98 11.48c0 4.84 3.14 8.93 7.5 10.38.55.1.75-.24.75-.53v-1.86c-3.05.66-3.69-1.3-3.69-1.3-.5-1.28-1.22-1.62-1.22-1.62-.99-.67.07-.66.07-.66 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.58 1.19 3.21.9.1-.71.38-1.19.69-1.46-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.1-2.92 0 0 .92-.29 3.02 1.12A10.5 10.5 0 0 1 12 6.8c.93 0 1.87.12 2.75.35 2.1-1.41 3.02-1.12 3.02-1.12.59 1.52.22 2.64.11 2.92.7.77 1.12 1.75 1.12 2.95 0 4.21-2.56 5.15-5 5.43.39.33.74.98.74 1.98v2.94c0 .29.19.64.75.53 4.35-1.45 7.49-5.54 7.49-10.38C23.02 5.23 18.27.5 12 .5Z" />
              </svg>
            </span>
            <div>
              <div class="font-medium">GitHub</div>
              <div class="text-xs text-gray-600">Repository, issues, and pull requests.</div>
            </div>
          </a>

          <!-- Direct link for Volunteer (opens GitHub immediately) -->
          <a
            class="w-full text-left flex items-start gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50"
            href="https://github.com/codefornorway/help-map"
            target="_blank"
            rel="noopener">
            <span class="mt-0.5 p-1.5 rounded border">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-9 9a9 9 0 0 1 18 0Z" />
              </svg>
            </span>
            <div>
              <div class="font-medium">Become a Volunteer</div>
              <div class="text-xs text-gray-600">Contribute on GitHub now.</div>
            </div>
          </a>

          <button class="w-full text-left flex items-start gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50" @click="showView('donor')">
            <span class="mt-0.5 p-1.5 rounded border">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.76 3.64a4.5 4.5 0 0 1 6.36 6.36L12 17.13 4.88 10a4.5 4.5 0 0 1 6.36-6.36l.76.76.76-.76Z" />
              </svg>
            </span>
            <div>
              <div class="font-medium">Become a Sponsor</div>
              <div class="text-xs text-gray-600">All donations go to contributors.</div>
            </div>
          </button>
        </div>

        <!-- EDIT ADDRESS -->
        <div v-else-if="menuView === 'edit'" class="space-y-4">
          <p class="text-xs text-gray-600">Update an existing record. Required fields are marked with *.</p>

          <form class="grid gap-3">
            <fieldset class="grid gap-2 rounded-lg border p-2">
              <legend class="text-sm font-medium px-1">Basic Info</legend>

              <label class="grid gap-1">
                <span class="text-xs">Address Name *</span>
                <input required type="text" class="rounded-lg border px-2 py-1.5" placeholder="Kirkens Bymisjon Bergen" />
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Organization</span>
                <input type="text" class="rounded-lg border px-2 py-1.5" placeholder="Kirkens Bymisjon / Red Cross" />
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Type</span>
                <select class="rounded-lg border px-2 py-1.5">
                  <option value="">Select…</option>
                  <option value="community">Community</option>
                  <option value="food">Food</option>
                  <option value="clothes">Clothes</option>
                  <option value="shelter">Shelter</option>
                  <option value="health">Health</option>
                  <option value="legal">Legal</option>
                </select>
              </label>
            </fieldset>

            <fieldset class="grid gap-2 rounded-lg border p-2">
              <legend class="text-sm font-medium px-1">Location</legend>

              <label class="grid gap-1">
                <span class="text-xs">Address Line *</span>
                <input required type="text" class="rounded-lg border px-2 py-1.5" placeholder="Kong Oscars gate 62, 5017 Bergen" />
              </label>

              <div class="grid gap-2">
                <label class="grid gap-1">
                  <span class="text-xs">City *</span>
                  <input required type="text" class="rounded-lg border px-2 py-1.5" placeholder="Bergen" />
                </label>

                <label class="grid gap-1">
                  <span class="text-xs">Postcode</span>
                  <input inputmode="numeric" pattern="\\d{4}" class="rounded-lg border px-2 py-1.5" placeholder="5003" />
                </label>
              </div>

              <div class="grid gap-2">
                <label class="grid gap-1">
                  <span class="text-xs">Latitude</span>
                  <input inputmode="decimal" pattern="^-?\\d+(\\.\\d+)?$" class="rounded-lg border px-2 py-1.5" placeholder="60.3926" />
                </label>
                <label class="grid gap-1">
                  <span class="text-xs">Longitude</span>
                  <input inputmode="decimal" pattern="^-?\\d+(\\.\\d+)?$" class="rounded-lg border px-2 py-1.5" placeholder="5.3317" />
                </label>
              </div>
            </fieldset>

            <fieldset class="grid gap-2 rounded-lg border p-2">
              <legend class="text-sm font-medium px-1">Details</legend>

              <label class="grid gap-1">
                <span class="text-xs">Description</span>
                <textarea rows="4" maxlength="600" class="rounded-lg border px-2 py-1.5" placeholder="Services, conditions, target group…"></textarea>
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Opening Hours</span>
                <input type="text" class="rounded-lg border px-2 py-1.5" placeholder="Mon–Fri 10:00–16:00" />
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Source / Reference URL</span>
                <input type="url" class="rounded-lg border px-2 py-1.5" placeholder="https://..." />
              </label>
            </fieldset>

            <label class="flex items-start gap-2 text-xs">
              <input type="checkbox" class="mt-0.5 rounded" />
              <span>I confirm the information I provide is accurate.</span>
            </label>

            <div class="grid gap-2">
              <button type="submit" class="rounded-lg border bg-gray-900 text-white px-3 py-2">Save</button>
              <button type="reset" class="rounded-lg border px-3 py-2">Reset</button>
            </div>
          </form>
        </div>

        <!-- ADD ADDRESS -->
        <div v-else-if="menuView === 'add'" class="space-y-4">
          <p class="text-xs text-gray-600">Suggest a new location. Required fields are marked with *.</p>

          <form class="grid gap-3">
            <fieldset class="grid gap-2 rounded-lg border p-2">
              <legend class="text-sm font-medium px-1">Basic Info</legend>

              <label class="grid gap-1">
                <span class="text-xs">Address Name *</span>
                <input required type="text" class="rounded-lg border px-2 py-1.5" placeholder="Red Cross Oslo" />
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Organization</span>
                <input type="text" class="rounded-lg border px-2 py-1.5" placeholder="Red Cross" />
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Type</span>
                <select class="rounded-lg border px-2 py-1.5">
                  <option value="">Select…</option>
                  <option value="community">Community</option>
                  <option value="food">Food</option>
                  <option value="clothes">Clothes</option>
                  <option value="shelter">Shelter</option>
                  <option value="health">Health</option>
                  <option value="legal">Legal</option>
                </select>
              </label>
            </fieldset>

            <fieldset class="grid gap-2 rounded-lg border p-2">
              <legend class="text-sm font-medium px-1">Location</legend>

              <label class="grid gap-1">
                <span class="text-xs">Address Line *</span>
                <input required type="text" class="rounded-lg border px-2 py-1.5" placeholder="Storgata 1, 0001 Oslo" />
              </label>

              <div class="grid gap-2">
                <label class="grid gap-1">
                  <span class="text-xs">City *</span>
                  <input required type="text" class="rounded-lg border px-2 py-1.5" placeholder="Oslo" />
                </label>

                <label class="grid gap-1">
                  <span class="text-xs">Postcode</span>
                  <input inputmode="numeric" pattern="\\d{4}" class="rounded-lg border px-2 py-1.5" placeholder="0001" />
                </label>
              </div>

              <div class="grid gap-2">
                <label class="grid gap-1">
                  <span class="text-xs">Latitude</span>
                  <input inputmode="decimal" pattern="^-?\\d+(\\.\\d+)?$" class="rounded-lg border px-2 py-1.5" placeholder="59.9139" />
                </label>
                <label class="grid gap-1">
                  <span class="text-xs">Longitude</span>
                  <input inputmode="decimal" pattern="^-?\\d+(\\.\\d+)?$" class="rounded-lg border px-2 py-1.5" placeholder="10.7522" />
                </label>
              </div>
            </fieldset>

            <fieldset class="grid gap-2 rounded-lg border p-2">
              <legend class="text-sm font-medium px-1">Details</legend>

              <label class="grid gap-1">
                <span class="text-xs">Description</span>
                <textarea rows="4" maxlength="600" class="rounded-lg border px-2 py-1.5" placeholder="Services provided…"></textarea>
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Opening Hours</span>
                <input type="text" class="rounded-lg border px-2 py-1.5" placeholder="Mon–Fri 10:00–16:00" />
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Source / Reference URL</span>
                <input type="url" class="rounded-lg border px-2 py-1.5" placeholder="https://..." />
              </label>
            </fieldset>

            <label class="flex items-start gap-2 text-xs">
              <input type="checkbox" class="mt-0.5 rounded" />
              <span>I confirm the information I provide is accurate.</span>
            </label>

            <div class="grid gap-2">
              <button type="submit" class="rounded-lg border bg-gray-900 text-white px-3 py-2">Add</button>
              <button type="reset" class="rounded-lg border px-3 py-2">Reset</button>
            </div>
          </form>
        </div>

        <!-- FEEDBACK -->
        <div v-else-if="menuView === 'feedback'" class="space-y-4">
          <p class="text-xs text-gray-600">Share improvements or correct data. Required fields are marked with *.</p>

          <form class="grid gap-3">
            <fieldset class="grid gap-2 rounded-lg border p-2">
              <legend class="text-sm font-medium px-1">Message</legend>

              <label class="grid gap-1">
                <span class="text-xs">Subject *</span>
                <select required class="rounded-lg border px-2 py-1.5">
                  <option value="">Select…</option>
                  <option value="general">General feedback</option>
                  <option value="data-correction">Data/Address correction</option>
                  <option value="feature">Feature suggestion</option>
                </select>
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Related Address (optional)</span>
                <input type="text" class="rounded-lg border px-2 py-1.5" placeholder="Name, city, or map link" />
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Your Email *</span>
                <input required type="email" class="rounded-lg border px-2 py-1.5" placeholder="you@example.com" />
              </label>

              <label class="grid gap-1">
                <span class="text-xs">Message *</span>
                <textarea required rows="6" maxlength="1000" class="rounded-lg border px-2 py-1.5" placeholder="Write details… (max 1000 characters)"></textarea>
              </label>
            </fieldset>

            <div class="grid gap-2">
              <button type="submit" class="rounded-lg border bg-gray-900 text-white px-3 py-2">Send</button>
              <button type="reset" class="rounded-lg border px-3 py-2">Reset</button>
            </div>
          </form>
        </div>

        <!-- CONTACT (simple) -->
        <div v-else-if="menuView === 'contact'" class="space-y-3">
          <p class="text-xs text-gray-600">Quick contact form.</p>
          <form class="grid gap-2">
            <label class="grid gap-1">
              <span class="text-xs">Name</span>
              <input type="text" class="rounded-lg border px-2 py-1.5" placeholder="Your name" />
            </label>
            <label class="grid gap-1">
              <span class="text-xs">Email</span>
              <input type="email" class="rounded-lg border px-2 py-1.5" placeholder="you@example.com" />
            </label>
            <label class="grid gap-1">
              <span class="text-xs">Message</span>
              <textarea rows="4" class="rounded-lg border px-2 py-1.5" placeholder="How can we help?"></textarea>
            </label>
            <button type="submit" class="rounded-lg border bg-gray-900 text-white px-3 py-2">Send</button>
          </form>
        </div>

        <!-- DONOR -->
        <div v-else-if="menuView === 'donor'" class="space-y-3">
          <p class="text-xs text-gray-600">All donations go directly to developers and contributors.</p>
          <div class="grid gap-2">
            <a href="https://buymeacoffee.com/zackha" target="_blank" rel="noopener" class="rounded-lg border px-3 py-2 text-center">Buy me a coffee</a>
            <a href="https://github.com/sponsors/zackha" target="_blank" rel="noopener" class="rounded-lg border px-3 py-2 text-center">GitHub Sponsors</a>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
