---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

name: Report an issue with @lui-ui/lui-vue
description: Tell us if something is not working as expected
body:
  - type: markdown
    attributes:
      value: |
        ## Thanks for reaching out!
        Before submitting an issue please make sure that you use latest version
  - type: textarea
    id: description
    attributes:
      label: Describe the bug
    validations:
      required: true
  - type: input
    id: link
    attributes:
      label: If possible, please include a link to a codesandbox with the reproduced problem
  - type: dropdown
    id: fix
    attributes:
      label: Do you know how to fix the issue
      options:
        - 'Yes'
        - 'No'
  - type: dropdown
    id: participate
    attributes:
      label: Are you willing to participate in fixing this issue and create a pull request with the fix
      options:
        - 'Yes'
        - 'No'
  - type: textarea
    id: possibleFix
    attributes:
      label: Possible fix
