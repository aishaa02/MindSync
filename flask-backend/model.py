import torch
import torch.nn as nn
import torch.nn.functional as F

class DGCNN(nn.Module):
    def __init__(self, in_channels, num_electrodes, hid_channels, num_layers, num_classes):
        super(DGCNN, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, hid_channels, kernel_size=1)
        self.layers = nn.ModuleList([
            nn.Conv2d(hid_channels, hid_channels, kernel_size=1)
            for _ in range(num_layers - 1)
        ])
        self.fc = nn.Linear(hid_channels * num_electrodes, num_classes)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        for layer in self.layers:
            x = F.relu(layer(x))
        x = x.view(x.size(0), -1)  # flatten
        x = self.fc(x)
        return x
