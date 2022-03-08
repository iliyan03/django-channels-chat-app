from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required


from . import forms

@login_required
def index(request):
    return render(request, 'chat/index.html')

@login_required
def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })

def register(request):
    User = get_user_model()
    if request.method == 'POST':
        form = forms.SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
        else:
            print("Invalid Form")
    else:
        form = forms.SignUpForm()

    context = {
        "form": form,
    }
    return render(request, 'chat/register.html', context)
