# Project 3: Around The U.S.

## Project Description

This is a webpage that uses responsive design to adpapt to varying screen sizes from 320px to 1280px. Going from biggest to smallest screensize the amount of columns start at 3 then reduce down to 2 at around 930px. As the screen compresses the profile will rearrange itself to a vertical orientation instead of a horizontal one. For the mobile screensize the cards will be in a single column.

## Technologies Used

HTML5 CSS3 & vanilla Javascript.

**Images**

[desktop] (./images/demo/desktop view.png)
[tablet] (./images/demo/tablet-view.png)
[mobile] (./images.demo/mobile-view.png)

## Github Pages

[link to github pages] (https://rstaats0925.github.io/se_project_aroundtheus/)

## Future Improvements & Additions

### Improvements

#### Maintainability

- Organize Global Variables

Right now the global variables are a wall of text
with no organization. This can be improved by grouping
together variables either by similarity i.e. all modal
variables grouped next to each other, all button variables
grouped together etc. Or grouping variables by relationship
i.e. all variables that are part of the edit profile modal,
all variables that are part of the add-card modal etc.

- Organize Function Declarations

The same could be said about the function declarations.
Functions that handle opening & closing modals should be
grouped together, as should functions that handle adding
& deleting cards, & functions that are modal specific such
as the handleProfileSubmitForm & fillProfileForm

- CSS Fonts

If you look over the CSS source code you'll probably notice
that the same font-family & fallback fonts are declared for
every bit of text. This isn't very D.R.Y. This could be
improved by declaring the font-family in the page block so
that the entire page inherits this property. Not having to
repeatedly declare it has the added benefit of making it easier
to focus on other style properties that should probably attract
more attention anyway.

#### Additions

- Edit Profile Picture

As it stands there's no way of changing the profile picture.
If the user changes the profile username & subtext then it
stands to reason that the user would also want to change the
profile picture. This can be accomplished by adding an input
for an image link under the subtext input in the
edit-profile-modal. This extra bit of info can then be processed
in the handleProfileFormSubmit function by grabbing the image
element in the profile section of the html (index.html line 13)
& replacing the src attribute with the one submitted in the form.

- Database For Images

Any images that get added to the page are erased & cards that are
deleted get reinstated as soon as the page gets refreshed. This is
because the data is being read from a single JS file & so new data
isn't being permanently saved. The changes are rendered by temporarily
altering the DOM. Creating & connecting to a database would allow
the user to permanently save changes & be a great addition the page.
Databases are currently outside of my knowledge & skillset. However,
saving & reading data from a text file might serve as a sufficient
placeholder until a proper database can be implemented.
